import i18next from 'i18next';
import { routes } from '../routers/routes';

const en = routes.map((route) => route.en).reduce((_, item) => item, {});
const vi = routes.map((route) => route.vi).reduce((_, item) => item, {});

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
      translation: en,
    },
    vi: {
      translation: vi,
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
