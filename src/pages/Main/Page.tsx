import React from 'react';
import { useTranslation } from 'react-i18next';
import { ELanguageNs } from '../../common/enums';

import { AuthService } from '../../services/AuthService';

/** Main page. */
const MainPage: React.FC = () => {
    const { t } = useTranslation([ELanguageNs.MAIN]);

    return (
        <>
            <div>{t('title')}</div>
            <div>{t('info.title')}</div>
            <div>{JSON.stringify(AuthService().getUserInfo())}</div>
        </>
    );
};

export default MainPage;
