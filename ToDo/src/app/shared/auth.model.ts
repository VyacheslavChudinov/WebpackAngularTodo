export interface AuthenticateRequest { 
    username: string,
    password: string
}

export class AuthConstants {
    public static readonly AuthToken: string = 'AuthToken';
    public static readonly StoredUser: string = 'StoredUser';
}