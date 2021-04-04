import { SagaIterator } from 'redux-saga';
import { call, takeLeading } from 'redux-saga/effects';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

import { iocContainer } from '../../ioc/inversifyConfig';
import { IOC_TYPES } from '../../ioc/types';
import { THttpServiceFactory } from '../../services/HttpService/models';

import { ProfileActionCreators } from './actionCreators';

const httpServiceFactory = iocContainer.get<THttpServiceFactory>(IOC_TYPES.HttpServiceFactory);
let client = httpServiceFactory({
    baseURL: 'https://794ba72c-bf36-43ed-b553-bbdd8e49774d.mock.pstmn.io',
}).client;

function* fetchSaga(): SagaIterator {
    return yield call(async () => {
        const res = await client.get('books', );

        /* tslint:disable */
        console.log('##########');
        console.log('res: ', res);
        console.log('##########');
        /* tslint:enable */

        return { data: { firstName: '13131231231' }};
    });
}

const profileWorkers = {
    fetch: bindAsyncAction(ProfileActionCreators.fetch, { skipStartedAction: true })(fetchSaga),
};

/** Crews saga watchers. */
export const profileWatchers = [
    takeLeading(ProfileActionCreators.fetch.started.type, profileWorkers.fetch),
];
