import { makeAutoObservable } from "mobx";

class UserState {
    username = localStorage.getItem('username') || null;
    datasets = [];  

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
        return this.datasets.find(dataset => dataset._id == id);
    }
}

export default new UserState();