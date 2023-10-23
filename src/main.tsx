import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import Routers from './routers';
import { I18nextProvider } from 'react-i18next';
import i18next from './assets/locales';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Provider } from 'react-redux';
import { reduxStore } from './assets/redux/store';
import CommonComponent from './routers/common';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={reduxStore}>
      <I18nextProvider i18n={i18next}>
        <CommonComponent>
          <Routers />
        </CommonComponent>
      </I18nextProvider>
    </Provider>
  </StrictMode>
);
