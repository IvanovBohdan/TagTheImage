import CanvasState from "../../store/CanvasState";
import Rect from "../../Tools/Rect";
import Circle from "../../Tools/Circle";
import Point from "../../Tools/Point";
import style from "./Toolbar.module.css";
import { observer } from "mobx-react-lite";
import { BiRectangle, BiCircle, BiCurrentLocation } from "react-icons/bi";
import classnames from "classnames";

const Toolbar = observer((props) => {
    return (
        <div className={style.toolbar}>
            <BiCurrentLocation
                className={classnames(style.tool, {
                    [style.active]: CanvasState?.tool?.point,
                })}
                onClick={() => CanvasState.setTool(new Point(CanvasState.canvas))}
            />
            <BiRectangle
                className={classnames(style.tool, {
                    [style.active]: CanvasState?.tool?.rect,
                })}
                onClick={() => CanvasState.setTool(new Rect(CanvasState.canvas))}
            />
            <BiCircle
                className={classnames(style.tool, {
                    [style.active]: CanvasState?.tool?.circle,
                })}
                onClick={() =>
                    CanvasState.setTool(new Circle(CanvasState.canvas))
                }
            />
        </div>
    );
});

export default Toolbar;
