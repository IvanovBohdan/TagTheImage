import { makeAutoObservable } from "mobx";

class UserState {
    username = localStorage.getItem("username") || null;
    datasets = [];
    files = [];
    images = [];
    areas = [];

    constructor() {
        makeAutoObservable(this);
    }

    setUsername(username) {
        this.username = username;
    }

    setDatasets(datasets) {
        this.datasets = datasets;
    }

    getDatasetById(id) {
        return this.datasets.find((dataset) => dataset._id === id);
    }

    setFiles(files) {
        this.files = Array.from(files);
    }

    setImages(images) {
        this.images = images;
    }

    getImageById(id) {
        return this.images.find((image) => image._id == id);
    }
}

export default new UserState();
