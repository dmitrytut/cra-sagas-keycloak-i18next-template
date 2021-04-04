import actionCreatorFactory from 'typescript-fsa';

import { getActionNamespace } from '../../utils/redux';

import { duckName } from './consts';

enum ECommonActionType {
    SET_INITIAL_STATE = 'SET_INITIAL_STATE',
}

const actionCreator = actionCreatorFactory(getActionNamespace(duckName));

export const CommonActionCreators = {
    setInitialState: actionCreator(ECommonActionType.SET_INITIAL_STATE),
};
