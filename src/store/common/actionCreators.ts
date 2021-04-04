import actionCreatorFactory from 'typescript-fsa';

import { getActionNamespace } from '../../utils/redux';

import { duckName } from './consts';

enum EAuthActionType {
    LOGOUT = 'LOGOUT',
}

const actionCreator = actionCreatorFactory(getActionNamespace(duckName));

export const AuthActionCreators = {
    logout: actionCreator(EAuthActionType.LOGOUT),
};
