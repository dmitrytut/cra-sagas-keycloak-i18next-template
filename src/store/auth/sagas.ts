import { SagaIterator } from 'redux-saga';
import { call, put, takeLeading } from 'redux-saga/effects';

import { AuthService } from '../../services/AuthService';
import { CommonActionCreators } from '../common/actionCreators';

import { AuthActionCreators } from './actionCreators';

function* logoutSaga(): SagaIterator {
    const authService = AuthService();

    yield call(() => authService.logout());
    yield put(CommonActionCreators.setInitialState());

    /** Clean other resources if needed here. */
}

/** Auth saga watchers. */
export const authWatchers = [takeLeading(AuthActionCreators.logout.type, logoutSaga)];
