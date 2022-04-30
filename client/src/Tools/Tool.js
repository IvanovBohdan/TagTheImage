export default class Tool {

    circle = false
    rect = false
    point = false

    constructor(canvas){
        this.canvas = canvas;
        this.node = canvas.node;
        this.destroyEvents()
    }

    destroyEvents(){
        this.node.onmousedown = null;
        this.node.onmousemove = null;
        this.node.onmouseup = null;
    }
}