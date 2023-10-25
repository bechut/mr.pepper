import React, { useEffect } from 'react';
import {
  AppDispatch,
  RootState,
  actions,
  thunks,
} from '../../../assets/redux/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Card, Form, Input } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ISignup } from './@types';

let clickCount = 0;

const Page: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const authStates = useSelector(
    (states: RootState) => states.signupSlice,
    shallowEqual
  );
  const onSignup = (values: ISignup) => {
    dispatch(thunks.signupSlice.signUp(values));
    clickCount = 1;
  };
  const { locale } = useParams();

  useEffect(() => {
    if (!authStates.loading && clickCount > 0) {
      form.resetFields();
      clickCount = 0;
    }

    if (authStates.success && clickCount > 0) {
      form.resetFields();
      clickCount = 0;

      setTimeout(() => {
        navigate(`/${locale}/login`);
        dispatch(actions.signupSlice.reset());
      }, 3000);
    }
  }, [authStates, form, navigate, dispatch, locale]);

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
        <Link to={`/${locale}/login`}>
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
