import { observer } from "mobx-react-lite"
import { ListItem, Node } from "../../types/types"
import treeStore from "../../strores/store";

const TaskItem = observer(({ item, children }: Node<ListItem>) => {
    const handlePortal = (event: React.MouseEvent) => {
        event.preventDefault();
        treeStore.openPortal(item.id);
    };

    const handleToggleExpand = (event: React.MouseEvent) => {
        event.preventDefault();
        treeStore.toggleExpanded(item.id);
    };

    const handleDelete = (event: React.MouseEvent) => {
        event.preventDefault();
        treeStore.deleteTask(item.id);
    };

    const handleSelect = () => {
        treeStore.selectTask(item.id);
    };

    return (
        <li className="text-white text-sm font-extralight text-opacity-90 mt-2 leading-none">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={item.checked}
                        onChange={() => treeStore.toggleTaskCheck(item.id)}
                    />
                    <span onClick={handleSelect}>{item.title}</span>
                    {children.length > 0 && (
                        <button
                            type="button"
                            className="ml-2 bg-transparent p-1 text-white text-[0.7rem] min-h-1 min-w-1 border-0 focus:outline-none"
                            onClick={handleToggleExpand}
                        >
                            {item.expanded ? '▼' : '►'}
                        </button>
                    )}
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
                        onClick={handleDelete}
                    >
                        X
                    </button>
                </div>
            </div>

            {item.expanded && children.length > 0 && (
                <ul className="ml-4 mt-2">
                    {children.map((child) => (
                        <TaskItem key={child.item.id} item={child.item} children={child.children} />
                    ))}
                </ul>
            )}
        </li>
    );
});

export default TaskItem;