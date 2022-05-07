import {
    SVG,
    extend as SVGextend,
    Element as SVGElement,
} from "@svgdotjs/svg.js";
import Tool from "./Tool";
import CanvasState from "../store/CanvasState";
import config from "../config";

export default class Rect extends Tool {
    rect = true;

    constructor(canvas) {
        super(canvas);
        this.mouseDown = false;
        this.listen();
    }

    listen() {
        this.node.onmousedown = this.onMouseDown.bind(this);
        this.node.onmousemove = this.onMouseMove.bind(this);
        this.node.onmouseup = this.onMouseUp.bind(this);
    }

    onMouseDown(e) {
        this.mouseDown = true;
        this.initialCords = { x: e.offsetX, y: e.offsetY };
        this.rect = this.canvas
            .rect()
            .attr(config.drawing)
            .move(e.offsetX, e.offsetY);
    }

    onMouseMove(e) {
        if (this.mouseDown) {
            let rect = this.rect;
            let currentCords = { x: e.offsetX, y: e.offsetY };
            let x = Math.min(this.initialCords.x, currentCords.x);
            let y = Math.min(this.initialCords.y, currentCords.y);
            let width = Math.abs(this.initialCords.x - currentCords.x);
            let height = Math.abs(this.initialCords.y - currentCords.y);
            rect.size(width, height).move(x, y);
        }
    }

    onMouseUp(e) {
        this.mouseDown = false;
        CanvasState.addArea(this.rect, "rect");
    }
}
