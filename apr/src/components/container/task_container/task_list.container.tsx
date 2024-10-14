import treeStore from "../../../strores/store";
import TaskItem from "../../task_item/task_item";
import { observer } from "mobx-react-lite";


function TaskList() {
    return (
        <section className="min-w-[50%] m-0 min-h-[478px] px-4 py-4 shadow-md bg-[rgba(15,33,63,0.8)] rounded-l-lg ">
            <h3 className="text-2xl text-white font-medium mb-4 text-left">Задачи</h3>

                {treeStore.rootTree.map((task) => (
                    <TaskItem key={task.item.id} item={task.item} children={task.children} />
                ))}

        </section>
    );
}

export default observer(TaskList);