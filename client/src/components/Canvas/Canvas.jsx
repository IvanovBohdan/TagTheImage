import { React, useEffect, useRef } from "react";
import CanvasState from "../../store/CanvasState";
import style from "./Canvas.module.css";
import { observer } from "mobx-react-lite";
import { SVG } from "@svgdotjs/svg.js";

const Canvas = observer((props) => {
    let canvasRef = useRef();

    useEffect(() => {
        
        CanvasState.resetState();
        CanvasState.setCanvas(canvasRef.current);
        CanvasState.setImage(props.image);
        CanvasState.importAreas(props.image.areas);
    }, [props.image]);

    return (
        <div className={style.container}>
            <svg
                style={{
                    backgroundImage: `url(${props.image.url})`,
                }}
                ref={canvasRef}
                id="canvas"
                width={props.width}
                height={props.height}
            >

            </svg>
        </div>
    );
});

export default Canvas;
