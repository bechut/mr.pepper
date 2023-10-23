import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, actions, type RootState } from '../assets/redux/store';
import { message } from 'antd';

const CommonComponent: React.FC<any> = (props) => {
  const { i18n } = useTranslation();
  const { locale } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();

  const routerStates = useSelector(
    (states: RootState) => states.routerSlice,
    shallowEqual
  );

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, []);

  useEffect(() => {
    const { show, status, message } = routerStates.alert;
    if (show) {
      messageApi.open({
        type: status ? 'success' : 'error',
        content: message,
      });
      dispatch(actions.routerSlice.resetAlert());
    }
  }, [routerStates, dispatch, messageApi]);

  return (
    <div>
      {contextHolder}
      {props.children}
    </div>
  );
};

export default CommonComponent;
