import Cookies from 'js-cookie';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { COOKIE_LANGUAGE_KEY } from '../../common/consts';
import { ELanguage } from '../../common/enums';

import './index.css';

/** Language switcher component. */
export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (newLang: ELanguage) => {
        i18n.changeLanguage(newLang).then(() => {
            Cookies.set(COOKIE_LANGUAGE_KEY, newLang);
        });
    };

    const getClass = (lang: ELanguage) => (lang === i18n.language ? 'active' : undefined);

    return (
        <div className="language-switcher">
            <button className={getClass(ELanguage.RU)} onClick={() => handleChangeLanguage(ELanguage.RU)}>
                RU
            </button>
            <button className={getClass(ELanguage.EN)} onClick={() => handleChangeLanguage(ELanguage.EN)}>
                EN
            </button>
        </div>
    );
};
