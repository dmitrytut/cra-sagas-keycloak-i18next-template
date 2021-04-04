import { AxiosInstance, AxiosRequestConfig } from 'axios';

/** Http service internal options. */
export interface IHttpServiceInternalConfig {
    /** Set interceptor to inject Authorization header. */
    injectAuthHeader?: boolean;

    /** Transform response to return only 'data' property. */
    extractDataFromResponse?: boolean;

    /** Transform error response. */
    transformError?: boolean;
}

/** Http service config. */
export interface IHttpServiceConfig extends AxiosRequestConfig {
    /** Http service internal options. */
    internal?: IHttpServiceInternalConfig;
}

/** Http service interface. */
export interface IHttpService<T = AxiosInstance> {
    /** Rest client instance. */
    readonly client: T;
}

export type THttpServiceFactory = (config?: IHttpServiceConfig) => IHttpService;
