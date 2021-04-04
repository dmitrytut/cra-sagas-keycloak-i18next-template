import actionCreatorFactory from 'typescript-fsa';

import { IError } from '../../common/models';
import { getActionNamespace } from '../../utils/redux';

import { duckName } from './consts';
import { IProfileRs } from './models';

enum EProfileActionType {
    FETCH = 'FETCH',
}

const actionCreator = actionCreatorFactory(getActionNamespace(duckName));

export const ProfileActionCreators = {
    fetch: actionCreator.async<void, IProfileRs, IError>(EProfileActionType.FETCH),
};
