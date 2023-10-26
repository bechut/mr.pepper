import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FloatButton } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@mr-pepper/firebase';
import { AppDispatch, type RootState, thunks } from '../assets/redux/store';
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
        if (loginStates.session.email) {
          setPageReady(true);
        }
      } else {
        if (!loginStates.session.email) {
          setPageReady(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (
      loginStates.session.email &&
      location.pathname.match(routeRegxp)
    ) {
      navagate(`/${locale}/`);
    } else if (
      !loginStates.session.email &&
      !location.pathname.match(routeRegxp)
    ) {
      navagate(`/${locale}/login`);
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
        badge={{ count: 'v1.1.0' }}
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
    path: ':locale/' + route.path,
    element: (
      <Wrapper>
        <Elem />
      </Wrapper>
    ),
      };
});
