import { combineReducers } from 'redux';
import { AnyAction } from 'typescript-fsa';

import { CommonActionCreators } from './common/actionCreators';
import { IAppState } from './models';
import { profileInitialState, profileSlice } from './profile/slice';

const appReducer = combineReducers<IAppState>({
    profile: profileSlice.reducer,
});

/**
 * Initial redux store state.
 */
export const initialReduxState = (): IAppState => ({
    profile: profileInitialState,
});

/**
 * Application root reducer;
 */
export const rootReducer = (state?: ReturnType<typeof appReducer>, action: AnyAction = { type: undefined }) => {
    if (action?.type === CommonActionCreators.setInitialState.type) {
        return appReducer(undefined, { type: undefined });
    }

    return appReducer(state, action);
};
