import { AuthenticationResult } from './authenticationResult';
import { LoginConsts } from './login-consts';

export class AuthenticationService {
    
    public static authenticate(login: any) : void {
        console.log(login);
        window.localStorage.setItem(LoginConsts.ACCESS_TOKEN_KEY, login.data.jwToken);
        window.localStorage.setItem(LoginConsts.USERNAME_KEY, login.data);
        AuthenticationService.setUserId(login.data.id);
        console.log(login.data)
    }

    public static isAuthenticated() : boolean {
        return window.localStorage.getItem(LoginConsts.USERNAME_KEY) != null;
    }

    public static getUserId() : string | null {
        return localStorage.getItem(LoginConsts.USERNAME_KEY);
    }

    public static getUsername() : string | null {
        return window.localStorage.getItem(LoginConsts.USERNAME_KEY);
    }

    public static getAccessToken() : string | null {
        return window.localStorage.getItem(LoginConsts.ACCESS_TOKEN_KEY);
    }

    public static logOff() : void {
        window.localStorage.removeItem(LoginConsts.USERNAME_KEY)
        window.localStorage.removeItem(LoginConsts.ACCESS_TOKEN_KEY);
        document.location.href = '/';
    }

    public static setUserId(userId: string) : void {
        localStorage.setItem(LoginConsts.USER_ID, userId);
    }
}
