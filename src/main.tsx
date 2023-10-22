import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import Routers from './routers';
import { I18nextProvider } from 'react-i18next';
import i18next from './assets/locales';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Routers />
    </I18nextProvider>
  </StrictMode>
);
