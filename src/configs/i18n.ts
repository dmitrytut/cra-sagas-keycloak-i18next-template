import { InitOptions } from 'i18next';

import { ELanguage, ELanguageNs } from '../common/enums';
import { getLanguage } from '../utils/i18n';

/** Default translation (i18next) configuration. */
export const DEFAULT_TRANSLATION_CONFIG: InitOptions = {
    backend: {
        loadPath: '/assets/nls/{{lng}}/{{ns}}.json',
    },
    contextSeparator: '#',
    debug: false,
    defaultNS: 'Common',
    fallbackLng: ELanguage.RU,
    interpolation: {
        escapeValue: false,
    },
    keySeparator: '.',
    lng: getLanguage(),
    load: 'all',
    nsSeparator: ':',
    pluralSeparator: '-',
    whitelist: [ELanguage.RU, ELanguage.EN],
    ns: Object.values(ELanguageNs),
};
