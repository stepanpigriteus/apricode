import { createPortal } from 'react-dom';
import Portal_buttons from '../buttons/portal_buttons';
import { observer } from 'mobx-react-lite';



interface PortalProps {
    onClose: () => void;
    id: string;
}

 function Portal({ id }: PortalProps) {
    const targetElement = document.getElementById("root");
    // console.log("in portal" +  id)
    if (!targetElement) {
        return null;
    }

    return createPortal(
        <Portal_buttons parentId={id}/>,
        targetElement
    );
}

export default observer(Portal)



