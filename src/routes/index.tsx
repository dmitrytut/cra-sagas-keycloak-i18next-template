import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

import { MainPage } from '../pages/Main';

import { ROUTES } from './consts';
import { ProfileRoutes } from './profile';

/**
 * Application routes.
 */
export const AppRouter: React.ReactNode = (
    <BrowserRouter>
        <MainLayout>
            <Switch>
                <Route component={MainPage} key={ROUTES.MAIN.PATH} path={ROUTES.MAIN.PATH} exact />
                {/*Profile routes.*/}
                {ProfileRoutes}
                {/*No route was found.*/}
                <Redirect to={ROUTES.MAIN.PATH} />
            </Switch>
        </MainLayout>
    </BrowserRouter>
);
