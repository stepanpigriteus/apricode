import uuid from "react-uuid";
import { ListItem, Node } from "../types/types";
import { action, makeAutoObservable } from "mobx";


class TreeStore {
    rootTree: Node<ListItem>[] = [];
    showPortal = false;
    selectedTaskId: string | null = null;

    constructor() {

        makeAutoObservable(this);
    }



    addTask(parentId: string | null, title: string, description: string) {
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
            }
        }
    }

    findNodeById(nodes: Node<ListItem>[], id: string): Node<ListItem> | null {
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
    }


    @action
    openPortal = (id: string) => {   
        this.selectedTaskId = id; 
        this.showPortal = true; 
    };
  
    @action
    closePortal = () => {
        this.showPortal = false; 
        this.selectedTaskId = null;
    };

    @action
    selectTask = (id: string) => {
        this.selectedTaskId = id;
    };
    
}


// const rootTree: Node<ListItem>[] = [{
//     item: {
//         id: uuid(), 
//         title: "asdasfd",
//         description: "werertqwe",
//         expanded: false, 
//         checked: false
//     }, 
//     children: [],
//     },
//     {
//         item: {
//             id: uuid(), 
//             title: "asdasfd",
//             description: "werertqwe",
//             expanded: false, 
//             checked: false
//         }, 
//         children: [
//             {
//             item: {
//                 id: uuid(), 
//                 title: "asdasfd",
//                 description: "werertqwe",
//                 expanded: false, 
//                 checked: false
//             }, 
//             children: [],
//         },
//     ],
//     },
//     {
//         item: {
//             id: uuid(), 
//             title: "asdasfd",
//             description: "werertqwe",
//             expanded: false, 
//             checked: false
//         }, 
//         children: [],
//     },

// ]

const treeStore = new TreeStore();
export default treeStore;