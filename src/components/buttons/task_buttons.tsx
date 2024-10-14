import { useState } from "react";
import treeStore from "../../strores/store";
import { observer } from "mobx-react-lite";
import { CheckIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/solid';

function TaskButtons() {
    const [taskTitle, setTaskTitle] = useState("");

    const handleAddTask = () => {
        if (taskTitle.trim() !== "") {
            treeStore.addTask(null, taskTitle, "");
            setTaskTitle("");
            
      
        }
    };

    return (
        <div className="flex">
            <input
                type="text"
                className="border border-gray-300 rounded py-1 px-2 m-1 min-w-[50%] "
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)} 
                placeholder="Введите название задачи"
            />
            <button
                type="button"
                className="font-light bg-green-700 bg-opacity-85 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55"
                onClick={handleAddTask} 
            >
                Добавить
            </button>
            <button 
                className="flex items-center justify-center font-light bg-black bg-opacity-85 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55"
                onClick={treeStore.selectAll}
            >
                <CheckIcon className="w-5 h-5 text-green-500 mr-1" /> 
                все
            </button>
            <button 
                className="flex items-center justify-center font-light bg-black bg-opacity-85 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55"
                onClick={treeStore.deselectAll}
            >
                < XMarkIcon className="w-5 h-5 text-red-500 mr-1" /> 
                все
            </button>
            <button 
                className="flex items-center justify-center font-light bg-red-500 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55"
                onClick={treeStore.removeAllTasks}
            >
                < TrashIcon className="w-5 h-5 text-white-500 mr-1" /> 
                все
            </button>
        </div>
    );
}

export default observer(TaskButtons)