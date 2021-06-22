import { authHeader } from '../../../shared/auth-header';
import { AuthenticationService } from "../authentication/authentication-service";
import { ApplicationSettings } from "../../../configuration/application-settings";
import { LoginConsts } from './login-consts';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    isAuthenticated,
    delete: _delete
};

// var url = ApplicationSettings.API_URL + resource;

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'Email': username, 'Password': password })
    };

    return fetch(`${ApplicationSettings.API_URL}Account/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            window.localStorage.setItem(LoginConsts.USERNAME, JSON.stringify(user));

            AuthenticationService.authenticate(user, user);
            AuthenticationService.setUserId(user.data.id);
            return user;
        }).catch(error => {
            console.log("error");
            console.log(error);
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function isAuthenticated() {
    // remove user from local storage to log user out
    return localStorage.getItem('user') !== null;
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApplicationSettings.API_URL}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${ApplicationSettings.API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestResponse = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch(`${ApplicationSettings.API_URL}/users/register`, requestResponse).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch(`${ApplicationSettings.API_URL}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${ApplicationSettings.API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}