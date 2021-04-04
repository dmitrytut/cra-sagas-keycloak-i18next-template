import { IAppState } from '../models';

export const ProfileSelectors = {
    root: (state: IAppState) => state.profile,
};
