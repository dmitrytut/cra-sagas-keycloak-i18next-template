import { SagaIterator } from 'redux-saga';
import { call, takeLeading } from 'redux-saga/effects';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

import { safeCall } from '../../utils/redux';

import { ProfileActionCreators } from './actionCreators';
import { ProfileServices } from './services';

function* fetchSaga(): SagaIterator {
    return yield call(ProfileServices.fetch);
}

const profileWorkers = {
    fetch: bindAsyncAction(ProfileActionCreators.fetch, { skipStartedAction: true })(fetchSaga),
};

/** Profile saga watchers. */
export const profileWatchers = [takeLeading(ProfileActionCreators.fetch.started.type, safeCall(profileWorkers.fetch))];
