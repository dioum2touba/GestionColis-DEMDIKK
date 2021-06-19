import { authHeader } from '../../../shared/auth-header';
import { ApplicationSettings } from "../../../configuration/application-settings";

export const regionService = {
    getAll,
    getById,
    update, 
    delete: _delete
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApplicationSettings.API_URL}regions`, requestOptions)
    .then((response) => { 
        return response.json().then((data) => {
            console.log("regionService => getAll Respond: regions")
            console.log(data);
            return data;
        }).catch((err) => {
            console.log(err);
        }) 
    });
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    fetch(`${ApplicationSettings.API_URL}/regions/${id}`, requestOptions).then(handleResponse)
    .then(regions => {
        console.log("regionService => getById Respond: regions")
        console.log(regions)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return regions;
    });
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch(`${ApplicationSettings.API_URL}/regions/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApplicationSettings.API_URL}/regions/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}