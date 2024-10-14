import { createPortal } from 'react-dom';
import Portal_buttons from '../buttons/portal_buttons';
import { observer } from 'mobx-react-lite';



interface PortalProps {
    onClose: () => void;
    id: string;
}

 function Portal({ id }: PortalProps) {
    const targetElement = document.getElementById("root");
    console.log("in portal" +  id)
    if (!targetElement) {
        return null;
    }

    return createPortal(
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-[30%] h-[40%] max-w-[90%] max-h-[90%]">
                <h3 className='font-semibold mb-2'>Добавьте подзадачу</h3>
                <Portal_buttons parentId={id}/>
            </div>
        </div>,
        targetElement
    );
}

export default observer(Portal)