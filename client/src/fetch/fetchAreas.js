import ErrorState from "../store/ErrorState";
import config from "../config";

export const getAreas = async (image) => {
    const response = await fetch(`/api/areas/${image.id}`);
    const areas = await response.json();
    if (response.ok) {
        return areas;
    } else {
        ErrorState.setError(areas.message);
    }
};

export const createAreas = async (areas) => {

    const response = await fetch(`${config.api.url}/area`, {
        method: "POST",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(areas),
    });
    const newArea = await response.json();
    if (response.ok) {
        return newArea;
    } else {
        ErrorState.setError(newArea.message);
    }
};

export const deleteArea = async (id) => {
    const response = await fetch(`${config.api.url}/area/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": localStorage.getItem("token"),
        },
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    }else{
        ErrorState.setError(data.message);
    }
}
