/**
 * Language.
 */
export enum ELanguage {
    EN = 'en',
    RU = 'ru',
}

/** i18n namespaces. */
export enum ELanguageNs {
    COMMON = 'Common',
    AUTH = 'Auth',
    NAV = 'Nav',
    MAIN = 'Main',
    PROFILE = 'Profile',
}

/**
 * Error levels.
 */
export enum ECheckErrorLevel {
    /** Error. */
    ERROR = 'ERROR',

    /** Warning. */
    WARNING = 'WARNING',
}

/**
 * API processing statuses.
 */
export enum EProcessStatus {
    /** Request canceled. */
    CANCELED = 'CANCELED',

    /** Request fall via errors. */
    ERROR = 'ERROR',

    /** Initial state. */
    IDLE = 'IDLE',

    /** Request pending. */
    PENDING = 'PENDING',

    /** Request resolved successfully. */
    SUCCESS = 'SUCCESS',
}
