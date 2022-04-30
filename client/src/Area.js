class Area {
    constructor(area, name = '', description = '', tags = []) {
        this.area = area;
        this.description = description;
        this.tags = tags;
        this.node = this.area.node;
    }

}

export default Area;