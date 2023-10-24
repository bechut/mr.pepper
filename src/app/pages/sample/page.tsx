import React from 'react';
import { AppDispatch, actions } from '../../../assets/redux/store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';

const Page: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  return (
    <Space direction="vertical">
      <div>Locale defined: {t('sample:title?Hello1')}</div>
      <div>
        Locale not defined: {t('sample:title2-button-update?title_abc')}
      </div>
      <div>
        Alert:{' '}
        <button
          onClick={() => {
            dispatch(
              actions.routerSlice.setAlert({ message: 1, status: true })
            );
          }}
        >
          Test
        </button>
      </div>
    </Space>
  );
};

export default Page;
