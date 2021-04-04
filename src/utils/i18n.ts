import Cookies from 'js-cookie';

import { COOKIE_LANGUAGE_KEY } from '../common/consts';
import { ELanguage } from '../common/enums';

/**
 * Determine language.
 *
 * @param {boolean} useBrowserLocale Use browser default locale to determine language if it's not set in cookies.
 */
export const getLanguage = (useBrowserLocale: boolean = true): string => {
    let lang: string = ELanguage.RU;

    const cookiesLang = Cookies.get(COOKIE_LANGUAGE_KEY);
    if (cookiesLang) {
        lang = cookiesLang;
    } else if (useBrowserLocale) {
        // Try to get language from browsers default locales.
        const browserLocales = navigator.languages === undefined ? [navigator.language] : navigator.languages;

        if (browserLocales?.length) {
            const browserLang = browserLocales[0].trim().split(/-|_/)[0];

            if ((Object.values(ELanguage) as string[]).includes(browserLang)) {
                lang = browserLang;
            }
        }
    }

    return lang;
};
