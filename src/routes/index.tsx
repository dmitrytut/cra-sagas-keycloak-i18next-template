import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { MAIN_ROUTES } from './consts';
import { MainPage } from '../components/MainPage';
import { PrivateRoute } from '../components/PrivateRoute';
import { MainLayout } from '../components/MainLayout';

/**
 * Main application routes.
 */
export const MainAppRoutes: JSX.Element = (
    <PrivateRoute
        render={() => (
            <MainLayout>
                <Switch>
                    <Route component={MainPage} path={MAIN_ROUTES.MAIN_PAGE.PATH} exact />
                    <Redirect to={MAIN_ROUTES.MAIN_PAGE.PATH} />
                </Switch>
            </MainLayout>
        )}
        path={MAIN_ROUTES.MAIN_PAGE.PATH}
    />
);
