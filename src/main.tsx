import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import Routers from './routers';
import { I18nextProvider } from 'react-i18next';
import i18next from './assets/locales';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Provider } from 'react-redux';
import { reduxStore } from './assets/redux/store';
import CommonComponent from './routers/common';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7474f6cc',
        },
        components: {
          Layout: {},
          Menu: {
            // if you use "dark" theme on menu
          },
          Button: {
            colorLink: '#7474f6cc',
            colorLinkHover: '#7474f6',
          },
        },
      }}
    >
      <I18nextProvider i18n={i18next}>
        <Provider store={reduxStore}>
          <CommonComponent>
            <Routers />
          </CommonComponent>
        </Provider>
      </I18nextProvider>
    </ConfigProvider>
  </StrictMode>
);
