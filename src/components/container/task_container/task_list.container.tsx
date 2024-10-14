import TaskItem from "../../task_item/task_item";


function TaskList() {


    return(
        <>
        <section className="min-w-[40%] max-w-[45%] m-0 min-h-[478px] px-4 py-4  shadow-md bg-[rgba(15,33,63,0.8)] rounded-l-lg ">
            <h3 className="text-2xl text-white font-medium mb-4 text-left">Задачи</h3>
            <ul >
                <TaskItem/>
                
            </ul>
        </section>
        </>
    )
}

export default  TaskList;