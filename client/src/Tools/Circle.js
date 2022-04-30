import {SVG, extend as SVGextend, Element as SVGElement} from '@svgdotjs/svg.js'
import Tool from './Tool'
import AreaState from '../store/AreaState';

export default class Circle extends Tool {

    circle = true;

    constructor(canvas) {
        super(canvas)
        this.mouseDown = false;
        this.listen()
    }

    listen() {
        this.node.onmousedown = this.onMouseDown.bind(this);
        this.node.onmousemove = this.onMouseMove.bind(this);
        this.node.onmouseup = this.onMouseUp.bind(this);
    }

    onMouseDown(e) {
        this.mouseDown = true;
        this.circle = this.canvas.circle().attr({ fill: 'red' }).move(e.offsetX, e.offsetY);
        AreaState.addArea(this.circle);
    }

    onMouseMove(e) {
        if (this.mouseDown) {
            let circle = this.circle;
            let radius = Math.sqrt(Math.pow(e.offsetX - circle.cx(), 2) + Math.pow(e.offsetY - circle.cy(), 2));
            circle.radius(radius);
        }
    }

    onMouseUp(e) {
        this.mouseDown = false;
    }
}