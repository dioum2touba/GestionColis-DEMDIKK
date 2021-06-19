import { authHeader } from '../../../shared/auth-header';
import { ApplicationSettings } from "../../../configuration/application-settings";

export const typeColisService = {
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

    return fetch(`${ApplicationSettings.API_URL}TypeDeColis`, requestOptions).then(handleResponse)
    .then(typeColis => {
        console.log("typeColisService => getAll Respond: typeColis")
        console.log(typeColis)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return typeColis;
    });
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    fetch(`${ApplicationSettings.API_URL}/TypeDeColis/${id}`, requestOptions).then(handleResponse)
    .then(typeColis => {
        console.log("typeColiservice => getById Respond: typeColis")
        console.log(typeColis)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return typeColis;
    });
}

function update(typeColis) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(typeColis)
    }

    return fetch(`${ApplicationSettings.API_URL}/TypeDeColis/${typeColis.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApplicationSettings.API_URL}/TypeDeColis/${id}`, requestOptions).then(handleResponse);
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