export interface AuthenticationResult {
    Id: string,
    UserName: string,
    Email: string,
    Roles: string[],
    IsVerified: Boolean,
    JWToken: string,
    RefreshToken: string
}