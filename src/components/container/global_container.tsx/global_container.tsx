
import Task_buttons from "../../buttons/task_buttons";
import Editor from "../../editor/editor";
import TaskList from "../task_container/task_list.container";

export default function GlobalContainer() {
    return (
        <div className="min-w-[700px] mx-auto min-h-[478px] flex flex-col items-start text-left">
            <div >
            <Task_buttons/>
            </div>
            <div className="flex flex-row min-w-[100%] m-0  items-center">
                <TaskList/>
                <Editor/>
            </div>
            
        </div>
    );
}