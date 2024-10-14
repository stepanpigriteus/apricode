import { useState } from "react";
import treeStore from "../../strores/store";
import { observer } from "mobx-react-lite";


function TaskButtons() {
    const [taskTitle, setTaskTitle] = useState("");

    const handleAddTask = () => {
        if (taskTitle.trim() !== "") {
            treeStore.addTask(null, taskTitle, "");
            setTaskTitle("");
        }
    };

    return (
        <div>
            <input
                type="text"
                className="border border-gray-300 rounded py-1 px-2 m-1"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)} 
                placeholder="Введите название задачи"
            />
            <button
                type="button"
                className="font-light bg-black bg-opacity-85 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55"
                onClick={handleAddTask} 
            >
                Добавить
            </button>
            <button 
                className="font-light bg-black bg-opacity-85 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55"
                onClick={treeStore.selectAll}
                >
                &#128505; все
            </button>
            <button
                     onClick={treeStore.deselectAll}
                 className="font-light bg-black bg-opacity-85 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55">
                &#128503; все
            </button>
            <button 
                onClick={treeStore.removeAllTasks} 
                className="font-light bg-black bg-opacity-85 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55">
                &#128465; все
            </button>
        </div>
    );
}

export default observer(TaskButtons)