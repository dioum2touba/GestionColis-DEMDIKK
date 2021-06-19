import { authHeader } from '../../../shared/auth-header';
import { ApplicationSettings } from "../../../configuration/application-settings";

export const coliservice = {
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

    return fetch(`${ApplicationSettings.API_URL}colis`, requestOptions)
    .then((response) => {
        return response.json().then((data) => {
            console.log("coliservice => getAll Respond: colis")
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

    fetch(`${ApplicationSettings.API_URL}/colis/${id}`, requestOptions).then(handleResponse)
    .then(colis => {
        console.log("coliservice => getById Respond: colis")
        console.log(colis)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return colis;
    });
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch(`${ApplicationSettings.API_URL}/colis/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApplicationSettings.API_URL}/colis/${id}`, requestOptions).then(handleResponse);
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