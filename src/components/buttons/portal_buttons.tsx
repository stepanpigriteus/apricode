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

    const theme = treeStore.isDarkTheme ? 'dark' : 'light';

    const themeStyles = {
        dark: {
            background: 'bg-white',
            text: 'text-gray-800',
            input: 'bg-gray-100 border-gray-300',
            button: 'bg-blue-600 hover:bg-blue-400 text-white',
            closeButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        },
        light: {
            background: 'bg-gray-700',
            text: 'text-white',
            input: 'bg-gray-600 border-gray-600 text-white',
            button: 'bg-blue-700 hover:bg-blue-500 text-white',
            closeButton: 'bg-gray-400 hover:bg-gray-600 text-white'
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className={`${themeStyles[theme].background} ${themeStyles[theme].text} p-6 rounded-lg shadow-xl w-[30%] h-[40%] max-w-[90%] max-h-[90%]`}>
                <h3 className='font-semibold mb-2'>Добавьте подзадачу</h3>
                <div className="flex flex-col items-center h-[75%]">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`${themeStyles[theme].input} rounded py-1 px-2 m-1 w-full max-w-[95%]`}
                        placeholder="Название задачи"
                    />
                    <textarea
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        placeholder="Описание задачи"
                        className={`${themeStyles[theme].input} w-full flex-1 rounded pl-1.5 pt-3 max-w-[95%] min-h-[80%] resize-none m-1`}
                    />
                    <div className="mt-2 flex justify-end w-full">
                        <button
                            type="button"
                            onClick={handleAdd} 
                            className={`${themeStyles[theme].button} py-1.5 px-4 rounded mr-2`}
                        >
                            Добавить
                        </button>
                        <button 
                            className={`${themeStyles[theme].closeButton} py-1.5 px-4 rounded`} 
                            onClick={treeStore.closePortal}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(PortalButtons);