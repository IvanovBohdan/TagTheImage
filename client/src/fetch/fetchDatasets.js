import ErrorState from "../store/ErrorState";
import UserState from "../store/UserState";
import config from "../config";

export const getDatasets = async () => {
    let response = await fetch(config.api.url + '/dataset', {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token'),
        }
    })

    let ok = response.ok;
    let data = await response.json();
    if (ok) {
        UserState.setDatasets(data);
        return data;
    } else {
        ErrorState.setError(data.message);
        return null;
    }
        
}

export const getOneDataset = async (id) => {
    let response = await fetch(config.api.url + '/dataset/' + id, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token'),
        }
    })

    let ok = response.ok;
    let data = await response.json();
    if (ok) {
        ErrorState.setError(null);
        return data;
    }else {
        ErrorState.setError(data.message);
        return null;
    }
}

export const createDataset = async (data) => {
    let response = await fetch(config.api.url + '/dataset', {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let ok = response.ok;
    let resData = await response.json();
    if (ok) {
        ErrorState.setError(null);
        getDatasets();
        return resData;
    } else {
        ErrorState.setError(resData.message);
        return null;
    }
}

export const updateDataset = async (id, data) => {
    let response = await fetch(config.api.url + '/dataset/' + id, {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let ok = response.ok;
    let resData = await response.json();
    if (ok) {
        ErrorState.setError(null);
        getDatasets();
        return resData;
    } else {
        ErrorState.setError(resData.message);
        return null;
    }
}

export const deleteDataset = async (id) => {
    let response = await fetch(config.api.url + '/dataset/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem('token'),
        },
    })
    let ok = response.ok;
    let resData = await response.json();
    if (ok) {
        ErrorState.setError(null);
        getDatasets();
        return resData;
    } else {
        ErrorState.setError(resData.message);
        return null;
    }
}
