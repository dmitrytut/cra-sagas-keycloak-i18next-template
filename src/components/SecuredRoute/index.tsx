import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { AuthService } from '../../services/AuthService';

/** Secured Route HOC. */
export const SecuredRoute = (props: RouteProps) => (AuthService().isLoggedIn() ? <Route {...props} /> : null);
