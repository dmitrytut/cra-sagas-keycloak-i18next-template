import { Container } from 'inversify';

import { KeycloakAuthService } from '../services/AuthService/KeycloakAuthService';
import { IAuthService } from '../services/AuthService/models';

import { IOC_TYPES } from './types';

const iocContainer = new Container();
iocContainer.bind<IAuthService>(IOC_TYPES.AuthService).to(KeycloakAuthService);

export { iocContainer };
