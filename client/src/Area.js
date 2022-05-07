import CanvasState from "./store/CanvasState";
import config from "./config";
import UserState from "./store/UserState";

class Area {
    static parseFromBackend(areas, canvas) {

        return areas.map((area) => {

            if (area.type === "point") {
                let point = canvas
                    .circle()
                    .move(area.data.x, area.data.y)
                    .radius(config.area.point.radius)
                    .attr({ fill: config.area.point.fill });
                return new Area(point, area);
            }
            if (area.type === "rect") {
                let rect = canvas
                    .rect()
                    .move(area.data.x, area.data.y)
                    .size(area.data.width, area.data.height)
                    .attr({...config.area.rect});
                return new Area(rect, area);
            }
            if (area.type === "circle") {
                let circle = canvas
                    .circle()
                    .move(area.data.x, area.data.y)
                    .radius(area.data.radius)
                    .attr({...config.area.circle});
                return new Area(circle, area);
            }
        });
    }

    constructor(area, props) {

        this.area = area;
        this._id = props._id || null;
        this.new = props.new || false;  // true if the area is new
        this.label = props?.label || "";
        this.tags = props?.tags || [];
        this.node = area.node || null;
        this.description = props?.description || "";
        this.type = props?.type || null;
        this.image = props?.image || null;
        this.user = UserState.user || null;
        this.node.onclick = () => {
            CanvasState.setSelectedArea(this);
        };
    }

    get model() {

        let model = {
            image: this.image._id,
            user: this.user,
            label: this.label,
            new: this.new,
            tags: this.tags,
            description: this.description,
            _id: this._id,
        };

        switch (this.type) {
            case "point":
                return {
                    type: "point",
                    ...model,
                    data: {
                        x: this.area.cx(),
                        y: this.area.cy(),
                    },
                };
                break;
            case "rect":
                return {
                    type: "rect",
                    ...model,
                    data: {
                        x: this.area.x(),
                        y: this.area.y(),
                        width: this.area.width(),
                        height: this.area.height(),
                    },
                };
                break;
            case "circle":
                return {
                    type: "circle",
                    ...model,
                    data: {
                        x: this.area.cx(),
                        y: this.area.cy(),
                        radius: this.area.radius(),
                    },
                };
                break;
        }
    }

    remove() {
        this.area.remove();
    }

    update(props) {
        this.label = props.label || this.label;
        this.tags = props.tags || this.tags;
        this.description = props.description || this.description;
    }
}

export default Area;
