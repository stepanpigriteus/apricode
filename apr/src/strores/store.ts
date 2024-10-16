import uuid from "react-uuid";
import { ListItem, Node } from "../types/types";
import { autorun, makeAutoObservable } from "mobx";
import { sha3_256 } from "js-sha3";

class TreeStore {
    rootTree: Node<ListItem>[] = [];
    showPortal = false;
    selectedTaskId: string | null = null;
    isDarkTheme = false;
    searchTerm = '';

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        this.loadFromLocalStorage();
        autorun(() => {
            this.saveToLocalStorage();
        });
    }

    toggleTheme = () => {
        this.isDarkTheme = !this.isDarkTheme;
    }

    setSearchTerm = (term: string) => {
        this.searchTerm = term.toLowerCase();
    }

    get filteredTasks(): Node<ListItem>[] {
        if (!this.searchTerm) return this.rootTree;
        return this.filterNodes(this.rootTree);
    }

    filterNodes = (nodes: Node<ListItem>[]): Node<ListItem>[] => {
        return nodes.reduce((acc: Node<ListItem>[], node) => {
            const matchesSearch = node.item.title.toLowerCase().includes(this.searchTerm) ||
                                  node.item.description.toLowerCase().includes(this.searchTerm);
            const filteredChildren = this.filterNodes(node.children);
            
            if (matchesSearch || filteredChildren.length > 0) {
                acc.push({
                    ...node,
                    children: filteredChildren,
                    item: { ...node.item, expanded: true }
                });
            }
            return acc;
        }, []);
    }

    selectAll = () => {
        this.setAllChecked(this.rootTree, true);
    };

    deselectAll = () => {
        this.setAllChecked(this.rootTree, false);
    };

    setAllChecked = (nodes: Node<ListItem>[], checked: boolean) => {
        nodes.forEach(node => {
            node.item.checked = checked;
            this.setAllChecked(node.children, checked);
        });
    };

    addTask = (parentId: string | null, title: string, description: string):string => {
        const newTask: Node<ListItem> = {
            item: {
                id: uuid(),
                title,
                description,
                expanded: false,
                checked: false,
            },
            children: [],
        };

        if (parentId === null) {
            this.rootTree.push(newTask);
        } else {
            const parent = this.findNodeById(this.rootTree, parentId);
            if (parent) {
                parent.children.push(newTask); 
                parent.item.expanded = true;
                
            }
        }
        this.selectedTaskId = newTask.item.id;
        return this.selectedTaskId
    }

    findNodeById = (nodes: Node<ListItem>[], id: string): Node<ListItem> | null => {
        for (const node of nodes) {
            if (node.item.id === id) {
                return node;
            }
            const found = this.findNodeById(node.children, id);
            if (found) {
                return found;
            }
        }
        return null;
    };

    openPortal = (id: string) => {   
        this.selectedTaskId = id; 
        this.showPortal = true; 
    };

    closePortal = () => {
        this.showPortal = false; 
        this.selectedTaskId = null;
    };

    selectTask = (id: string) => {
        this.selectedTaskId = id;

    };

    toggleTaskCheck = (id: string) => {
        const node = this.findNodeById(this.rootTree, id);
        if (node) {
            node.item.checked = !node.item.checked;
            if (node.children.length > 0) {
                this.setDescendantsChecked(node, node.item.checked);
            }
            this.updateAncestorsChecked(this.rootTree, id);
        }
    };

    setDescendantsChecked = (node: Node<ListItem>, checked: boolean) => {
        node.children.forEach(child => {
            child.item.checked = checked;
            this.setDescendantsChecked(child, checked);
        });
    };

    updateAncestorsChecked = (nodes: Node<ListItem>[], childId: string): boolean => {
        for (const node of nodes) {
            if (node.item.id === childId) {
                return true;
            }
            if (this.updateAncestorsChecked(node.children, childId)) {
                node.item.checked = this.areAllDescendantsChecked(node);
                return true;
            }
        }
        return false;
    };

    
    areAllDescendantsChecked = (node: Node<ListItem>): boolean => {
        return node.children.every(child => 
            child.item.checked && this.areAllDescendantsChecked(child)
        );
    };

    setChildrenChecked = (node: Node<ListItem>, checked: boolean) => {
        node.children.forEach(child => {
            child.item.checked = checked;
            this.setChildrenChecked(child, checked);
        });
    };

    updateImmediateParentChecked = (nodes: Node<ListItem>[], childId: string): boolean => {
        for (const node of nodes) {
            if (node.children.some(child => child.item.id === childId)) {
                node.item.checked = node.children.every(child => child.item.checked);
                return true;
            }
            if (this.updateImmediateParentChecked(node.children, childId)) {
                return true; 
            }
        }
        return false;
    };

    updateParentChecked = (nodes: Node<ListItem>[], childId: string): boolean => {
        for (const node of nodes) {
            if (node.children.some(child => child.item.id === childId)) {
                const allChildrenChecked = node.children.every(child => child.item.checked);
                node.item.checked = allChildrenChecked;
                this.updateParentChecked(this.rootTree, node.item.id);
                return allChildrenChecked;
            }
            if (this.updateParentChecked(node.children, childId)) {
                return true;
            }
        }
        return false;
    };

    setNodeChecked = (node: Node<ListItem>, checked: boolean) => {
        node.item.checked = checked;
        node.children.forEach(child => this.setNodeChecked(child, checked));
    };


    toggleExpanded = (id: string) => {
        const node = this.findNodeById(this.rootTree, id);
        if (node) {
            node.item.expanded = !node.item.expanded;
        }
    }

    updateTask = (id: string, title: string, description: string) => {
        const node = this.findNodeById(this.rootTree, id);
        if (node) {
            node.item.title = title;
            node.item.description = description;
        }
    }

    deleteTask = (id: string) => {
        this.rootTree = this.deleteNodeById(this.rootTree, id);
    }

    deleteNodeById = (nodes: Node<ListItem>[], id: string): Node<ListItem>[] => {
        return nodes.filter(node => {
            if (node.item.id === id) {
                return false;
            }
            node.children = this.deleteNodeById(node.children, id);
            return true;
        });
    }

    removeAllTasks = () => {
        this.rootTree = [];
    }

    saveToLocalStorage = () => {
        const dataToStore = {
            rootTree: this.rootTree,
            isDarkTheme: this.isDarkTheme,
        };

        const stringifiedData = JSON.stringify(dataToStore);
        const hash = sha3_256.update(stringifiedData).hex();
        localStorage.setItem('treeStore', JSON.stringify({ hash, data: stringifiedData }));
    }
    
    loadFromLocalStorage = () => {
        const storedData = localStorage.getItem('treeStore');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData.data) {
                const currentHash = sha3_256.update(parsedData.data).hex();
                if (currentHash === parsedData.hash) {
                    const data = JSON.parse(parsedData.data);
                    this.rootTree = data.rootTree;
                    this.isDarkTheme = data.isDarkTheme;
                } else {
                    console.warn('Хеш данных не совпадает!');
                }
            } else {
                console.warn('Отсутствуют данные для загрузки.');
            }
        } else {
            console.warn('Нет сохраненных данных в localStorage.');
        }
    }
}

const treeStore = new TreeStore();
export default treeStore;