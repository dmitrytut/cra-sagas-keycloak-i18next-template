import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import { App } from './App';
import { DEFAULT_TRANSLATION_CONFIG } from './configs/i18n';
import reportWebVitals from './reportWebVitals';
import { AuthService } from './services/AuthService';

import './index.css';

/**
 * Initialize i18next & start application.
 */
i18n.use(Backend)
    .use(initReactI18next)
    .init(DEFAULT_TRANSLATION_CONFIG)
    .then(() => {
        const renderApp = () =>
            ReactDOM.render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>,
                document.getElementById('root'),
            );

        /**
         * Auth service initialization. if you want be able to get access to the main page without auth,
         * move initialisation to the corresponding part of the app.
         */
        const authService = AuthService();
        authService.init(renderApp);

        // If you want to start measuring performance in your app, pass a function
        // to log results (for example: reportWebVitals(console.log))
        // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
        reportWebVitals(console.log);
    })
    .catch((err: any) => console.log(`Error in i18next initialization: ${err}`));
