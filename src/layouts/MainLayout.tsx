import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ELanguageNs } from '../common/enums';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ROUTES } from '../routes/consts';
import { AuthService } from '../services/AuthService';
import { AuthActionCreators } from '../store/auth/actionCreators';

/** Main layout. */
export const MainLayout: React.FC = ({ children }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation([ELanguageNs.NAV, ELanguageNs.AUTH]);

    return (
        <>
            <LanguageSwitcher />
            <Link to={ROUTES.MAIN.PATH}>{t('main')}</Link>
            <Link to={ROUTES.PROFILE.PATH}>{t('profile')}</Link>
            {AuthService().isLoggedIn() && (
                <div>
                    <button onClick={() => dispatch(AuthActionCreators.logout())}>{t(`${ELanguageNs.AUTH}:actions.logout`)}</button>
                </div>
            )}
            <div>{children}</div>
        </>
    );
};
