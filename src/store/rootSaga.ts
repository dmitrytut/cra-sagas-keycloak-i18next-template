import { all } from 'redux-saga/effects';

import { authWatchers } from './auth/sagas';
import { profileWatchers } from './profile/sagas';

/** Root saga. */
export function* rootSaga(): IterableIterator<any> {
    yield all([...authWatchers, ...profileWatchers]);
}
