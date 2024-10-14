import { observer } from "mobx-react-lite";
import { useState } from "react";
import treeStore from "../../strores/store";



function PortalButtons({ parentId }: { parentId: string | null }) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    console.log("in portalButt" +  parentId)

    const handleAdd = () => {
        if (newTaskTitle.trim() && newTaskDescription.trim()) {
            treeStore.addTask(parentId, newTaskTitle, newTaskDescription);
            setNewTaskTitle('');
            setNewTaskDescription('');
            treeStore.closePortal()
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="flex flex-col items-center h-[75%]">
            <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded py-1 px-2 m-1 w-full max-w-[95%]"
                placeholder="Название задачи"
            />
            <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Описание задачи"
                className="w-full flex-1 border border-gray-300 rounded pl-1.5 pt-3 max-w-[95%] resize-none m-1"
            />
            <div>
            <button
                type="button"
                onClick={handleAdd} 
                className="hover:bg-black hover:bg-opacity-55"
            >
                Добавить
            </button>
            <button onClick={treeStore.closePortal}>Close</button>
            </div>
        </div>
    );
}
export default observer(PortalButtons);