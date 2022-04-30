import { makeAutoObservable } from "mobx";

class ErrorState {
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    setError(error) {
        this.error = error;
    }
}

export default new ErrorState();