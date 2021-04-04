import { iocContainer } from '../../ioc/inversifyConfig';
import { IOC_TYPES } from '../../ioc/types';
import { THttpServiceFactory } from './models';

export const HttpServiceFactory = iocContainer.get<THttpServiceFactory>(IOC_TYPES.HttpServiceFactory);
