import { observer } from "mobx-react-lite"
import { ListItem, Node } from "../../types/types"
import treeStore from "../../strores/store";
import Portal from "../modal/modal";


function TaskItem({ children, item }: Node<ListItem>) {
    const handlePortal = (event: React.MouseEvent) => {
        event.stopPropagation();
        console.log(item.id);
        treeStore.openPortal(item.id);
    };

    return (
        
        <li className="text-white text-sm font-extralight text-opacity-90 mt-2 leading-none">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>{item.title}</span>
                </div>
                <div>
                    <button
                        type="button"
                        className="ml-4 bg-transparent p-1 text-white text-[1rem] min-h-1 min-w-1 border-0 focus:outline-none"
                        onClick={handlePortal}
                    >
                        +
                    </button>
                    <button
                        type="button"
                        className="ml-2 bg-transparent p-1 text-white text-[0.7rem] min-h-1 min-w-1 border-0 focus:outline-none"
                    >
                        X
                    </button>
                </div>
            </div>

            {children.length > 0 && (
                <ul className="ml-4 mt-2">
                    {children.map((child) => (
                        <TaskItem key={child.item.id} {...child} />
                    ))}
                </ul>
            )}
            {treeStore.showPortal && <Portal onClose={treeStore.closePortal} id={item.id} />}
        </li>
    );
}


export default observer(TaskItem)
