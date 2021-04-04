import { Container, interfaces } from 'inversify';

import { KeycloakAuthService } from '../services/AuthService/KeycloakAuthService';
import { IAuthService } from '../services/AuthService/models';
import { AxiosHttpService } from '../services/HttpService/AxiosHttpService';
import { IHttpService, IHttpServiceConfig, THttpServiceFactory } from '../services/HttpService/models';

import { IOC_TYPES } from './types';

const iocContainer = new Container();
iocContainer.bind<IAuthService>(IOC_TYPES.AuthService).to(KeycloakAuthService).inSingletonScope();
iocContainer.bind<THttpServiceFactory>(IOC_TYPES.HttpServiceFactory).toFactory<IHttpService>((context: interfaces.Context) => {
    return (config?: IHttpServiceConfig) => {
        const authService = context.container.get<IAuthService>(IOC_TYPES.AuthService);
        return new AxiosHttpService(config, authService);
    };
});

export { iocContainer };
