import { Menu } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState, actions } from '../../../assets/redux/store';

export default function SecondMenuFriends() {
  const dispatch = useDispatch();

  const authLayoutStates = useSelector(
    (states: RootState) => states.authLayoutSlice,
    shallowEqual
  );

  useEffect(() => {
    dispatch(
      actions.authLayoutSlice.setSecondMenuKey(
        authLayoutStates.secondMenuKeys['friends']
      )
    );
  }, []);

  return (
    <Menu
      onClick={(e) => {
        dispatch(actions.authLayoutSlice.setSecondMenuKey(e.key));
      }}
      selectedKeys={[authLayoutStates.secondMenuKey]}
      mode="inline"
      items={authLayoutStates.secondMenuFriendsMenu}
    />
  );
}
