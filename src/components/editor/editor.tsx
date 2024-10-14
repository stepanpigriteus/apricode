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
            }
        }
    }, [treeStore.selectedTaskId]);

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
        <section className={`flex flex-col min-w-[50%] m-0 min-h-[478px] py-4 pl-2  'bg-white text-black' rounded-br-lg rounded-tr-lg shadow-md border border-gray-300`}>
            {treeStore.selectedTaskId ? (
                <>
                    <input
                        value={title}
                        onChange={handleTitleChange}
                        className={`w-full mb-2 pl-1.5 pt-1 pb-1 max-w-[95%]   'bg-white text-black'}`}
                        placeholder="Task title"
                    />
                    <textarea                
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Task description"
                        className={`w-full flex-1 pl-1.5 pt-3 max-w-[95%] resize-none 'bg-white text-black'}`}
                    />
                </>
            ) : (
                <h3 className="text-center">Выберите задачу для редактирования</h3>
            )}
        </section>
    )
}

export default observer(Editor);