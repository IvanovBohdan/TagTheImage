import {makeAutoObservable} from 'mobx';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js'

class CanvasState {
    
    canvas = null;

    constructor() {
        makeAutoObservable(this);
    }

    setCanvas(canvas) {
        this.canvas = SVG(canvas);
    }


}

export default new CanvasState();