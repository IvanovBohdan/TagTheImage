import {
    SVG,
    extend as SVGextend,
    Element as SVGElement,
} from "@svgdotjs/svg.js";
import Tool from "./Tool";
import CanvasState from "../store/CanvasState";
import config from "../config";

export default class Point extends Tool {
    point = true;

    constructor(canvas) {
        super(canvas);
        this.mouseDown = false;
        this.listen();
    }

    listen() {
        this.node.onmousedown = this.onMouseDown.bind(this);
    }

    onMouseDown(e) {
        this.mouseDown = true;
        this.point = this.canvas
            .circle()
            .attr({ fill: config.drawing.stroke })
            .move(e.offsetX, e.offsetY)
            .radius(5);
        CanvasState.addArea(this.point, "point");
    }
}
