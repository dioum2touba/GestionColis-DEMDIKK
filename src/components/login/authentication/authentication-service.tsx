import { AuthenticationResult } from './authenticationResult';
import { LoginConsts } from './login-consts';

export class AuthenticationService {
    
    public static authenticate(authenticationResult: AuthenticationResult, login: string) : void {
        window.localStorage.setItem(LoginConsts.ACCESS_TOKEN_KEY, authenticationResult.JWToken);
        window.localStorage.setItem(LoginConsts.USERNAME_KEY, login);
    }

    public static isAuthenticated() : boolean {
        return window.localStorage.getItem(LoginConsts.USER_ID) != null;
    }

    public static getUserId() : string | null {
        return localStorage.getItem(LoginConsts.USER_ID);
    }

    public static getUsername() : string | null {
        return window.localStorage.getItem(LoginConsts.USERNAME_KEY);
    }

    public static getAccessToken() : string | null {
        return window.localStorage.getItem(LoginConsts.ACCESS_TOKEN_KEY);
    }

    public static logOff() : void {
        window.localStorage.removeItem(LoginConsts.USER_ID)
        window.localStorage.removeItem(LoginConsts.ACCESS_TOKEN_KEY);
        document.location.href = '/';
    }

    public static setUserId(userId: string) : void {
        localStorage.setItem(LoginConsts.USER_ID, userId);
    }
}
