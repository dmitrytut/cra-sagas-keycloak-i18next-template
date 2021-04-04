/**
 * Main application routes names.
 */
export const MAIN_ROUTES = {
    CREW: {
        DETAILS: {
            PATH: '/crew/:id',
            QUALIFICATIONS: {
                PATH: '/crew/:id/qualifications',
            },
            TIMESHEET: {
                PATH: '/crew/:id/timesheet',
            },
        },
        PATH: '/crew',
    },
    INTEGRATION: {
        PATH: '/integration',
    },
    MAIN_PAGE: {
        PATH: '/',
    },
};
