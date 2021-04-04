import axios, { AxiosError, AxiosInstance } from 'axios';
import { injectable } from 'inversify';
import merge from 'lodash/merge';

import { IError } from '../../common/models';
import { isError } from '../../utils/error';
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
        transformError: true,
    },
};

@injectable()
export class AxiosHttpService implements IHttpService {
    public readonly client: AxiosInstance;

    constructor(config?: IHttpServiceConfig, authService?: IAuthService) {
        const normalizedConfig = config ? merge(DEFAULT_CONFIG, config) : DEFAULT_CONFIG;
        const { internal, ...axiosConfig } = normalizedConfig;

        this.client = axios.create(axiosConfig);

        if (internal?.injectAuthHeader) {
            if (!authService) {
                throw new Error("Authentication/Authorization service must be defined with 'internal.injectAuthHeader' option");
            }

            this.client.interceptors.request.use(async (config) => {
                if (authService.isLoggedIn()) {
                    await authService.updateToken();

                    config.headers.Authorization = `Bearer ${authService.getToken()}`;
                }

                return Promise.resolve(config);
            });
        }

        if (internal?.extractDataFromResponse) {
            this.client.interceptors.response.use((response) => Promise.resolve(response.data));
        }

        if (internal?.transformError) {
            this.client.interceptors.response.use(
                (response) => response,
                (error) => Promise.reject(this.errorWrapper(error)),
            );
        }

        // Add cache.
    }

    private errorWrapper = (error: AxiosError): IError => {
        // TODO: Add translation
        const defaultErrorMessage = 'Unknown error'; // translate('Error.unknown');
        let result: IError = {
            message: defaultErrorMessage,
            error: true,
        };

        if (error.response) {
            const { status, data, statusText } = error.response;
            const httpCode = status || 400;

            result = {
                ...result,
                httpCode,
                code: statusText || 'UNKNOWN_ERROR',
            };

            if (isError(data)) {
                result = { ...result, ...data };
            }
        } else {
            result = {
                ...result,
                code: error.code || 'UNKNOWN_ERROR',
                httpCode: error.code === 'ECONNABORTED' ? 408 : 400,
            };
        }

        return result;
    };
}
