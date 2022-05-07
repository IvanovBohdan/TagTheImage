import { makeAutoObservable } from "mobx";
import {
    SVG,
    extend as SVGextend,
    Element as SVGElement,
} from "@svgdotjs/svg.js";
import Area from "../Area";
import UserState from "./UserState";
import Tool from "../Tools/Tool";
import config from "../config";

class CanvasState {
    canvas = null;
    tool = null;
    areas = [];
    selectedArea = null;
    currentImage = null;

    constructor() {
        makeAutoObservable(this);
    }

    setCanvas(canvas) {
        this.canvas = SVG(canvas);
    }

    setTool(tool) {
        this.tool = tool;
    }

    setImage(image) {
        this.currentImage = image;
    }

    addArea(area, type) {
        this.setTool(new Tool(this.canvas));
        let newArea = new Area(area, {
            type: type,
            new: true,
            image: this.currentImage,
        });
        this.areas.push(newArea);
        this.selectedArea = newArea;
    }

    setAreas(areas) {
        this.areas = areas;
    }

    setSelectedArea(area) {
        this.selectedArea = area;
    }

    removeArea(area) {
        this.areas = this.areas.filter((a) => a !== area);
        area.remove();
        this.selectedArea = null;
    }

    exportAreas() {
        return this.areas.map((area) => area.model).filter((area) => area.new);
    }

    importAreas(areas) {
        this.areas = Area.parseFromBackend(areas, this.canvas);
    }

    resetState(importedAreas) {
        this.areas.forEach((area) => area.remove());
        this.areas = [];
        this.selectedArea = null;
        this.currentImage = null;
        this.tool = null;
        this.canvas = null;
    }
}

export default new CanvasState();
