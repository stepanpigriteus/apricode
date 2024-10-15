import { observer } from "mobx-react-lite";

import { useEffect, useState } from "react";
import treeStore from "../../strores/store";

function Editor() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

  useEffect(() => {
        if (treeStore.selectedTaskId) {
            const task = treeStore.findNodeById(treeStore.rootTree, treeStore.selectedTaskId);
            if (task) {
                setTitle(task.item.title);
                setDescription(task.item.description);
            } else {
                setTitle("");
                setDescription("");
                treeStore.selectedTaskId = null; 
            }
        } else {
            setTitle("");
            setDescription("");
        }
    }, [treeStore.selectedTaskId, treeStore.rootTree]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (treeStore.selectedTaskId) {
            treeStore.updateTask(treeStore.selectedTaskId, e.target.value, description);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        if (treeStore.selectedTaskId) {
            treeStore.updateTask(treeStore.selectedTaskId, title, e.target.value);
        }
    };

    return(
        <section className={`flex flex-col min-w-[50%] m-0 min-h-[478px] py-4 pl-2  ${treeStore.isDarkTheme ? 'bg-gray-40 text-black border border-gray-110' : 'bg-gray-700 text-gray-200 '} rounded-br-lg rounded-tr-lg shadow-md border-gray-300`}>
            {treeStore.selectedTaskId ? (
                <>
                    <input
                        value={title}
                        onChange={handleTitleChange}
                        className={`w-full mb-2 pl-1.5 pt-1 pb-1 max-w-[95%] ${treeStore.isDarkTheme ? 'bg-white text-black disabled:bg-gray-700' : 'bg-gray-700 text-gray-200 focus:outline-gray-500 '}`}
                        placeholder="Название задачи"
                    />
                    <textarea                
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Описание задачи"
                        className={`w-full flex-1 pl-1.5 pt-3 max-w-[95%] resize-none ${treeStore.isDarkTheme ? 'bg-white text-black' : 'bg-gray-700 text-gray-200 focus:outline-gray-500 '}`}
                    />
                </>
            ) : (
                <h3 className="text-center">Выберите задачу для редактирования</h3>
            )}
        </section>
    )
}

export default observer(Editor);