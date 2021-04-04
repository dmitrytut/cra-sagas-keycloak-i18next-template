import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { ROUTES } from 'apps/teller/routes/consts';

import { TOKEN_NAME } from 'consts';

/** PrivateRoute HOC. */
export const PrivateRoute = (props: RouteProps) =>
    localStorage.getItem(TOKEN_NAME) ? (
        <Route {...props} />
    ) : (
        <Redirect
            to={{
                pathname: ROUTES.LOG_OUT.PATH,
                state: { from: props.location },
            }}
        />
    );
