import { IProfileState } from './profile/models';

/**
 * Application redux state model.
 */
export interface IAppState {
    profile: IProfileState;
}
