import React, { Suspense } from 'react';
import { Route } from 'react-router';

import { SecuredRoute } from '../../components/SecuredRoute';
import { ProfilePage } from '../../pages/Profile';
import { ROUTES } from '../consts';

/**
 * Profile page routes.
 */
export const ProfileRoutes: React.ReactNode = (
    <SecuredRoute path={ROUTES.PROFILE.PATH}>
        <Suspense fallback={<div>Loading...</div>}>
            <Route component={ProfilePage} key={ROUTES.PROFILE.PATH} path={ROUTES.PROFILE.PATH} exact />
            <Route component={ProfilePage} key={ROUTES.PROFILE.EDIT.PATH} path={ROUTES.PROFILE.EDIT.PATH} exact />
        </Suspense>
    </SecuredRoute>
);
