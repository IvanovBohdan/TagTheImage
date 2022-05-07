import ErrorState from "../store/ErrorState";
import UserState from "../store/UserState";
import config from "../config";

export const uploadImages = async (files, body) => {
    const formData = new FormData();
    formData.append("json", JSON.stringify(body));
    files.forEach((file, index) => {
        formData.append("file", file);
    })
    const response = await fetch(`${config.api.url}/image`, {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        body: formData
    });
    const data = await response.json();
    if (response.ok){
        return data;
    }else{
        ErrorState.setError(data.message);
    }
}

export const getImages = async (dataset) => {
    const response = await fetch(`${config.api.url}/image?${new URLSearchParams({dataset})}`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });

    const data = await response.json();
    console.log(data);
    if (response.ok){
        UserState.setImages(data);
        return data;
    }else{
        ErrorState.setError(data.message);
        return null
    }
}

export const updateImage = async (id, body) => {
    const response = await fetch(`${config.api.url}/image/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const data = await response.json();
    if (response.ok){
        return data;
    }else{
        ErrorState.setError(data.message);
    }
}

export const deleteImage = async (id) => {
    const response = await fetch(`${config.api.url}/image/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    const data = await response.json();
    if (response.ok){
        return data;
    }else{
        ErrorState.setError(data.message);
    }
}