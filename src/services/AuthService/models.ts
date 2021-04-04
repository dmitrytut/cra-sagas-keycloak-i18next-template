export interface IAuthService {
    init: (onAuthenticatedCallback: () => void) => Promise<void>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    updateToken: () => Promise<void>;
    getToken: () => string | undefined;
    getUserInfo: () => any;
    isLoggedIn: () => boolean;
    hasRole: (roles: string[]) => boolean;
}
