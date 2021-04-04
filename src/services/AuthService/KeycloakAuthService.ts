import { injectable } from 'inversify';
import Keycloak from 'keycloak-js';

import { IAuthService } from './models';

@injectable()
export class KeycloakAuthService implements IAuthService {
    private readonly _kc: Keycloak.KeycloakInstance;

    constructor() {
        this._kc = Keycloak('/keycloak.json');
    }

    async init(onAuthenticatedCallback: () => void): Promise<void> {
        await this._kc.init({
            onLoad: 'login-required',
            pkceMethod: 'S256',
        });

        // if (authenticated) {
        onAuthenticatedCallback();
        // } else {
        //   doLogin();
        // }
    }

    login(): Promise<void> {
        return this._kc.login();
    }

    logout(): Promise<void> {
        return this._kc.logout();
    }

    async updateToken(): Promise<void> {
        try {
            await this._kc.updateToken(5);
        } catch {
            await this.login();
        }
    }

    getToken(): string | undefined {
        return this._kc.token;
    }

    getUserInfo(): any {
        return this._kc.tokenParsed;
    }

    hasRole(roles: string[]): boolean {
        return roles.some((role) => this._kc.hasRealmRole(role));
    }

    isLoggedIn(): boolean {
        return Boolean(this._kc?.token);
    }
}
