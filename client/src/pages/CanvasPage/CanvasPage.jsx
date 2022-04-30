import { observer } from "mobx-react-lite";
import Canvas from '../../components/Canvas/Canvas';
import CanvasState from "../../store/CanvasState";
import ToolState from "../../store/ToolState";
import Rect from "../../Tools/Rect";
import Circle from "../../Tools/Circle";
import { useEffect, React } from "react";
import Toolbar from '../../components/Toolbar/Toolbar';
import style from "./CanvasPage.module.css";

const CanvasPage =  (props) => {

    return (
        <div className={style.container}>
            <Toolbar />
            <Canvas width={700} height={700} />
        </div>
    )

}

export default CanvasPage;