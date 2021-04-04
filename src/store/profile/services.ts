import { HttpServiceFactory } from '../../services/HttpService';

import { IProfileRs } from './models';

const restClient = HttpServiceFactory({
    baseURL: 'http://localhost:3030',
}).client;

/** Profile services. */
export const ProfileServices = {
    /** Fetch profile info. */
    fetch: (): Promise<IProfileRs> => restClient.get<void, IProfileRs>('/profile'),
};
