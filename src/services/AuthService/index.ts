import { iocContainer } from '../../ioc/inversifyConfig';
import { IOC_TYPES } from '../../ioc/types';

import { IAuthService } from './models';

export const AuthService = () => iocContainer.get<IAuthService>(IOC_TYPES.AuthService);
