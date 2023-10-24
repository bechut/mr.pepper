import React from 'react';
import { AppDispatch, RootState, thunks } from '../../../assets/redux/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Card, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ISignup } from './@types';

const Page: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const authStates = useSelector(
    (states: RootState) => states.signupSlice,
    shallowEqual
  );
  const onSignup = (values: ISignup) => {
    dispatch(thunks.signupSlice.signUp(values));
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
        <h2>{t('sign-up:form-title?sign_up')}</h2>
        <Form
          name="basic"
          onFinish={onSignup}
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
            name="username"
            label={t('sign-up:form-label?username')}
            rules={[{ required: true }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            name="password"
            label={t('sign-up:form-label?password')}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Button loading={authStates.loading} htmlType="submit" type="primary">
            {t('sign-up:form-button?sign_up')}
          </Button>
        </Form>
        <Link to="/login">
          <Button
            loading={authStates.loading}
            htmlType="button"
            type="link"
            icon={<ArrowLeftOutlined />}
          >
            {t('log-in:form-button?log_in')}
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default Page;
