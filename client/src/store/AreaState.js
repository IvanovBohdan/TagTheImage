import { makeAutoObservable } from "mobx";
import Area from "../Area";

class AreaState {
    areas = [];
    selectedArea = null;

    constructor() {
        makeAutoObservable(this);
    }

    addArea(area) {
        let newArea = new Area(area);
        this.areas.push(newArea);
        this.selectedArea = newArea;
        console.log(this.areas[this.areas.length - 1]);
    }
}

export default new AreaState();