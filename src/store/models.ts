import type { ICrewsReduxState } from './ducks/crews';

/**
 * Main application redux state model.
 */
export interface IMainAppReduxState {
    crews: ICrewsReduxState;
}
