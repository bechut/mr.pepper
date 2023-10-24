import React, { useState, useEffect } from 'react';
import { AppDispatch, RootState, thunks } from '../../../assets/redux/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Card, Form, Input, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ILogin } from './@types';

const Page: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const loginStates = useSelector(
    (states: RootState) => states.loginSlice,
    shallowEqual
  );
  const [ip, setIp] = useState<string>('');
  const { locale } = useParams();

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp(''));
  }, []);

  const onLogin = (values: ILogin) => {
    dispatch(thunks.loginSlice.login({ ...values, ip }));
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Card
        style={{
          top: '50%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <h2>{t('log-in:form-title?log_in')}</h2>
        <Form
          name="basic"
          onFinish={onLogin}
          labelAlign="left"
          labelCol={{ xs: 24 }}
          form={form}
        >
          <Form.Item
            name="email"
            label={t('sign-up:form-label?email')}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label={t('sign-up:form-label?password')}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Button loading={loginStates.loading} htmlType="submit" type="primary">
            {t('log-in:form-button?log_in')}
          </Button>
        </Form>
        <Space direction="vertical" style={{ margin: '16px 0' }}>
          {/* {auth.currentUser && !auth.currentUser.emailVerified ? (
            <Button
              loading={authStates.loading}
              onClick={onRequestVerificationEmail}
              icon={<ReloadOutlined />}
              type="default"
            >
              Request verification email
            </Button>
          ) : null} */}
          <Link to={`/${locale}/sign-up`}>
            <Button
              loading={loginStates.loading}
              htmlType="button"
              type="link"
              icon={<ArrowLeftOutlined />}
            >
              {t('sign-up:form-button?sign_up')}
            </Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
};

export default Page;
