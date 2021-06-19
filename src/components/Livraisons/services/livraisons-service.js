import { authHeader } from '../../../shared/auth-header';
import { ApplicationSettings } from "../../../configuration/application-settings";

export const livraisonService = {
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

    return fetch(`${ApplicationSettings.API_URL}livraisons`, requestOptions).then(handleResponse)
    .then(livraisons => {
        console.log("livraisonservice => getAll Respond: livraisons")
        console.log(livraisons)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return livraisons;
    });
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    fetch(`${ApplicationSettings.API_URL}/livraisons/${id}`, requestOptions).then(handleResponse)
    .then(livraisons => {
        console.log("livraisonservice => getById Respond: livraisons")
        console.log(livraisons)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return livraisons;
    });
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch(`${ApplicationSettings.API_URL}/livraisons/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApplicationSettings.API_URL}/livraisons/${id}`, requestOptions).then(handleResponse);
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