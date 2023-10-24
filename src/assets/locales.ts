import i18next from 'i18next';

import samplepEn from '../app/pages/sample//locale/en';
import sampleVi from '../app/pages/sample/locale/vi';

import signupEn from '../app/pages/sign-up/locale/en';
import signupVi from '../app/pages/sign-up/locale/vi';

import loginEn from '../app/pages/login/locale/en';
import loginVi from '../app/pages/login/locale/vi';

i18next.init({
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React handles escaping
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  },
  resources: {
    en: {
      translation: {
        ...samplepEn,
        ...signupEn,
        ...loginEn,
      },
    },
    vi: {
      translation: {
        ...sampleVi,
        ...signupVi,
        ...loginVi,
      },
    },
  },
  parseMissingKeyHandler: (key) => {
    return key
      .split('?')[1]
      .split('_')
      .map((str: string) => str[0].toUpperCase() + str.substring(1))
      .join(' ');
  },
});

export default i18next;
