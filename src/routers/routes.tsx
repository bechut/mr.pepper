import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FloatButton } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

import sample from '../app/pages/sample/route';
import signUp from '../app/pages/sign-up/route';
import login from '../app/pages/login/route';

const Wrapper: React.FC<any> = (props) => {
  const { i18n } = useTranslation();
  const { locale } = useParams();
  const location = useLocation();
  const navagate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  return (
    <div>
      {props.children}
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<GlobalOutlined />}
        badge={{ count: "v1.0.1" }}
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

export const routes = [sample, signUp, login].map((route) => {
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
