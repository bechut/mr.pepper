import React from 'react';
import { AppDispatch, actions } from '../../../assets/redux/store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/auth-layout';

const HomePage: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  return (
    <AuthLayout>
      <div />
    </AuthLayout>
  );
};

export default HomePage;
