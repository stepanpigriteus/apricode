import uuid from "react-uuid";
import { ListItem, Node } from "../types/types";
import {  autorun, makeAutoObservable } from "mobx";



class TreeStore {
    rootTree: Node<ListItem>[] = [];
    showPortal = false;
    selectedTaskId: string | null = null;

    constructor() {

        makeAutoObservable(this, {}, { autoBind: true })
        autorun(() => {
            console.log(JSON.stringify(this.rootTree));
          });
    }


    selectAll = () => {
      this.rootTree.forEach(todo => {
        todo.item.checked = true;
      });
    };


    addTask = (parentId: string | null, title: string, description: string) => {
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
                parent.children.push(newTask); // Use push instead of spread operator
            }
        }
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
        }
    };

    
    
}


const treeStore = new TreeStore();
export default treeStore;