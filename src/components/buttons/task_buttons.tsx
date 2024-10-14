


function TaskButtons() {
 
    return (
        <>
            <div>
                <input
                    type="text"
                                        className="border border-gray-300 rounded py-1 px-2 m-1"
                />
                <button type="button" className="font-light bg-black bg-opacity-85 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55">
                    Добавить
                </button>
                <button className="font-light bg-black bg-opacity-85 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55">
                    &#128505; все
                </button>
                <button  className="font-light bg-black bg-opacity-85 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55">
                    &#128503; все
                </button>
                <button  className="font-light bg-black bg-opacity-85 py-2 px-2 text-xs text-white m-1 rounded hover:bg-black hover:bg-opacity-55">
                    &#128465; все
                </button>
            </div>
        </>
    );
}

export default TaskButtons;