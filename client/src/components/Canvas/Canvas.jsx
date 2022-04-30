import {React, useEffect, useRef} from 'react';
import CanvasState from '../../store/CanvasState';
import ToolState from '../../store/ToolState';

import {observer} from 'mobx-react-lite';

const Canvas = observer((props) => {

    let canvasRef = useRef()

    useEffect(() => {
        CanvasState.setCanvas(canvasRef.current);
    }, [])
    

    return (
        <svg
            ref={canvasRef}
            id="canvas"
            width={props.width}
            height={props.height}
        />
    );
})

export default Canvas;