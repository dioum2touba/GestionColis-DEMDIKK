import { authHeader } from '../../../shared/auth-header';
import { ApplicationSettings } from "../../../configuration/application-settings";

export const typeLivraisonService = {
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

    return fetch(`${ApplicationSettings.API_URL}TypeLivraisons`, requestOptions).then(handleResponse)
    .then(typeLivraison => {
        console.log("typeLivraisonService => getAll Respond: typeLivraison")
        console.log(typeLivraison)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return typeLivraison;
    });
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    fetch(`${ApplicationSettings.API_URL}/TypeLivraisons/${id}`, requestOptions).then(handleResponse)
    .then(typeLivraison => {
        console.log("typeLivraisonervice => getById Respond: typeLivraison")
        console.log(typeLivraison)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return typeLivraison;
    });
}

function update(typeLivraison) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(typeLivraison)
    }

    return fetch(`${ApplicationSettings.API_URL}/TypeLivraisons/${typeLivraison.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApplicationSettings.API_URL}/TypeLivraisons/${id}`, requestOptions).then(handleResponse);
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