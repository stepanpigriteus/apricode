


function TaskItem() {

    return(
        <>
        <ul>
            <li 
                className="text-white text-sm font-extralight text-opacity-90 mt-2 leading-none flex justify-between items-center"

            >
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="mr-2 "

                    />

                </div>
                <div> 
                <button 
                    type="button"
                    className="ml-4 bg-transparent p-1 text-white-500 text-[1rem] min-h-1 min-w-1 border-0  focus:outline-none"
                >
                    +
                </button>
                <button 
                    type="button"
                    className="ml-2 bg-transparent p-1 text-white-500 text-[0.7rem] min-h-1 min-w-1 border-0  focus:outline-none"
                >
                    X
                </button>
                </div>
            </li>
        </ul>

        </>
    )
}

export default TaskItem