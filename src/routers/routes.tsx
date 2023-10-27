import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FloatButton } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@mr-pepper/firebase';
import {
  AppDispatch,
  type RootState,
  thunks,
  actions,
} from '../assets/redux/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { sessionSub } from '../app/sub/session.sub';
import { ISession } from '../app/pages/login/@types';

import sample from '../app/pages/sample/route';
import signUp from '../app/pages/sign-up/route';
import login from '../app/pages/login/route';
import home from '../app/pages/homepage//route';
import LoadingScreen from '../app/components/loading-screen/page';

const routeRegxp = /(login|sign-up)/;

const Wrapper: React.FC<any> = (props) => {
  const { i18n } = useTranslation();
  const { locale } = useParams();
  const location = useLocation();
  const navagate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [pageReady, setPageReady] = useState<boolean>(false);

  const loginStates = useSelector(
    (states: RootState) => states.loginSlice,
    shallowEqual
  );

  useEffect(() => {
    i18n.changeLanguage(locale);
    dispatch(actions.authLayoutSlice.localeChange(locale));
  }, [locale, i18n]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!user.emailVerified) {
          return signOut(auth);
        } else if (!loginStates.session.email) {
          return sessionSub((session: ISession) =>
            dispatch(thunks.loginSlice.setSessionAsync({ session }))
          );
        }
      }
    });
  }, []);

  useEffect(() => {
    const _locale = locale || 'en';
    if (loginStates.session.email && location.pathname.match(routeRegxp)) {
      navagate(`/${_locale}/`);
    } else if (
      !loginStates.session.email &&
      !location.pathname.match(routeRegxp)
    ) {
      navagate(`/${_locale}/login`);
    } else {
      setTimeout(() => setPageReady(true), 1000);
    }
  }, [loginStates, locale, navagate]);

  if (!pageReady) return <LoadingScreen />;

  return (
    <div>
      {props.children}
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<GlobalOutlined />}
        badge={{ count: 'v2.0.1' }}
      >
        <FloatButton
          onClick={() => navagate(location.pathname.replace('/vi', '/en'))}
          icon={<div>en</div>}
        />
        <FloatButton
          onClick={() => navagate(location.pathname.replace('/en', '/vi'))}
          icon={<div>vi</div>}
        />
      </FloatButton.Group>
    </div>
  );
};

export const routes = [sample, signUp, login, home].map((route) => {
  const Elem = route.element;

  return {
    ...route,
    path: route.path,
    element: (
      <Wrapper>
        <Elem />
      </Wrapper>
    ),
  };
});
