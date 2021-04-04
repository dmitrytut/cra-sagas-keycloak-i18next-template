import type { IAsyncData, IItem } from '../../common/models';

/**
 * Profile model.
 */
export interface IProfile {
    name?: string;
    birthDate?: string;
}

/**
 * Profile redux state model.
 */
export interface IProfileState extends IAsyncData<IProfile> {}

/**
 * Response format profile.
 */
export interface IProfileRs extends IItem<IProfile> {}
