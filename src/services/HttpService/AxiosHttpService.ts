import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { injectable } from 'inversify';
import merge from 'lodash/merge';

import { IAuthService } from '../AuthService/models';

import { IHttpService, IHttpServiceConfig } from './models';

/** Default http service config options. */
const DEFAULT_CONFIG: IHttpServiceConfig = {
    baseURL: '',
    timeout: 10000,
    withCredentials: false,
    internal: {
        injectAuthHeader: true,
        extractDataFromResponse: true,
    },
};

@injectable()
export class HttpService implements IHttpService {
    public readonly client: AxiosInstance;

    constructor (config?: IHttpServiceConfig, authService?: IAuthService) {
        const normalizedConfig = config ? merge(DEFAULT_CONFIG, config) : DEFAULT_CONFIG;
        const { internal, ...axiosConfig } = normalizedConfig;

        this.client = axios.create(axiosConfig);

        if (internal?.injectAuthHeader) {
            if (!authService) {
                throw new Error('Authentication/Authorization service must be defined with \'internal.injectAuthHeader\' option');
            }

            this.client.interceptors.request.use(async (config) => {
                /* tslint:disable */
                console.log('##########');
                console.log('authService.isLoggedIn(): ', authService.isLoggedIn());
                console.log('##########');
                /* tslint:enable */
                if (authService.isLoggedIn()) {
                    await authService.updateToken();

                    /* tslint:disable */
                    console.log('##########');
                    console.log('authService.getToken(): ', authService.getToken());
                    console.log('##########');
                    /* tslint:enable */

                    config.headers.Authorization = `Bearer ${authService.getToken()}`;
                }

                return Promise.resolve(config);
            });
        }

        if (internal?.extractDataFromResponse) {
            this.client.interceptors.response.use(
                (response) => response.data,
                (error) => Promise.reject(error),
            );
        }

        // Add cache.
    }
}
