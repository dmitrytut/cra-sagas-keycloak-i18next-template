import { createSlice } from '@reduxjs/toolkit';

import { asyncReducer, getInitialAsyncData } from '../../utils/redux';

import { ProfileActionCreators } from './actionCreators';
import { duckName } from './consts';
import { IProfile, IProfileRs, IProfileState } from './models';

export const profileInitialState: IProfileState = getInitialAsyncData<IProfile>();

/** Profile information state slice. */
export const profileSlice = createSlice({
    name: duckName,
    initialState: profileInitialState,
    reducers: {},
    extraReducers: {
        ...asyncReducer<void, IProfileState, IProfileRs>(ProfileActionCreators.fetch),
    },
});
