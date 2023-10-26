import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, actions, type RootState } from '../assets/redux/store';
import { message } from 'antd';
import { MessagePayload, getMessaging, onMessage } from 'firebase/messaging';
import { getApp } from 'firebase/app';

const CommonComponent: React.FC<any> = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();

  const routerStates = useSelector(
    (states: RootState) => states.routerSlice,
    shallowEqual
  );

  useEffect(() => {
    new Promise((resolve) => {
      onMessage(getMessaging(getApp()), (payload: MessagePayload) => {
        dispatch(
          actions.routerSlice.setAlert({
            message: payload.data?.message + ' ' + payload.data?.description,
            status: true,
          })
        );
        resolve(payload);
      });
    });
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
