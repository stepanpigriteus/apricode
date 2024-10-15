import { observer } from "mobx-react-lite";
import { useState } from "react";
import treeStore from "../../strores/store";


function PortalButtons({ parentId }: { parentId: string | null }) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const handleAdd = () => {
        if (newTaskTitle.trim()) {
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center">
            <div className="bg-gray-100 p-6 rounded shadow-lg w-[30%] h-[40%] max-w-[90%] max-h-[90%]">
                <h3 className='font-semibold mb-2 text-black'>Добавьте подзадачу</h3>
                <div className="flex flex-col items-center h-[75%]">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`border border-gray-300 rounded  py-1 px-2 m-1 w-full max-w-[95%]
                             ${treeStore.isDarkTheme ? 'bg-white text-black disabled:bg-gray-800 text-black' : 'bg-gray-100 text-black placeholder:text-gray-600'}`}
                        placeholder="Название задачи"
                    />
                    <textarea
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        placeholder="Описание задачи"
                        className={`w-full flex-1 border border-gray-300 rounded pl-1.5 pt-3 max-w-[95%] min-h-[80%] resize-none m-1
                             ${treeStore.isDarkTheme ? 'bg-white text-black disabled:bg-gray-800 text-black' : 'bg-gray-100 text-black placeholder:text-gray-600'}`}
                    />
                    <div>
                    <div className="mt-2">
                        <button
                            type="button"
                            onClick={handleAdd} 
                            className={`hover:bg-black hover:bg-opacity-55 mr-4 bg-black text-white py-1.5 ${treeStore.isDarkTheme ? 'bg-black text-black disabled:bg-gray-800 text-black' : 'bg-gray-600 '}`}
                        >
                            Добавить
                        </button>
                        <button className="py-1.5 text-black shadow-lg shadow-black-500" onClick={treeStore.closePortal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    );
}
export default observer(PortalButtons);