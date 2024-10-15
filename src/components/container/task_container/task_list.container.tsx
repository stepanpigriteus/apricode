import treeStore from "../../../strores/store";
import TaskItem from "../../task_item/task_item";
import { observer } from "mobx-react-lite";
import "./task_list.css"

const TaskList = observer(() => {

    return (
        <section className={`min-w-[50%] h-[478px] overflow-y-auto px-4 py-4 shadow-md overflow-y-auto section-scroll ${treeStore.isDarkTheme ? 'bg-[rgba(15,33,63,0.8)] text-black' : 'bg-[rgba(15,33,63,0.95)] text-gray-200'} rounded-l-lg`}>
            <h3 className="text-2xl text-white font-medium mb-4 text-left">Задачи</h3>
            <ul>
                {treeStore.rootTree.map((task) => (
                    <TaskItem key={task.item.id} item={task.item} children={task.children} />
                ))}
            </ul>
        </section>
    );
});

export default TaskList;