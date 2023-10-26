import React, { useEffect } from 'react';
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Space,
  Row,
  Col,
  Dropdown,
  Button,
  Input,
} from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../redux';
// import { actions, thunks } from '../redux/reducers';
import {
  LogoutOutlined,
  MenuOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import {
  AppDispatch,
  RootState,
  actions,
  thunks,
} from '../../../assets/redux/store';
import AddFriendPopup from '../add-friend-popup';
// import { auth } from '../lib/firebase';
// import { signOut } from 'firebase/auth';
// import FriendModal from '../components/Modal/Friend/page';
// import { isEmailSchema } from '../validate/user';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { string } from 'yup';

export const isEmailSchema = string()
  .email('Invalid email address')
  .required('Email required');

const { Header, Content, Sider } = Layout;

const AuthLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useDispatch<AppDispatch>();

  const authLayoutStates = useSelector(
    (states: RootState) => states.authLayoutSlice,
    shallowEqual
  );

  useEffect(() => {
    const { searchedFriend } = authLayoutStates;
    dispatch(
      actions.authLayoutSlice.setAddFriendPopUpVisible(
        !!searchedFriend.email
      )
    );
  }, [authLayoutStates, dispatch]);

  const onSearch = () => {
    const { searchEmail, searchedFriend } = authLayoutStates;
    isEmailSchema
      .validate(searchEmail)
      .then(() => {
        if (searchEmail !== searchedFriend.email) {
          dispatch(
            thunks.authLayoutSlice.searchFriendByEmail({
              email: searchEmail,
            })
          );
        }
      })
      .catch((e) => {
        dispatch(
          actions.routerSlice.setAlert({
            message: e.message,
            status: false,
          })
        );
      });
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" collapsed={true} style={{ position: 'relative' }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={[authLayoutStates.firstMenuKey]}
          mode="inline"
          items={authLayoutStates.firstMenu}
          onClick={(e) => {
            dispatch(actions.authLayoutSlice.setFirstMenuKey(e.key));
          }}
        />
      </Sider>

      <Sider
        theme="dark"
        collapsible={false}
        style={{ backgroundColor: 'white', padding: '16px 0 0 0' }}
        width={220}
      >
        <div className="demo-logo-vertical">
          <Space></Space>
        </div>

        <div style={{ margin: '16px 0' }}>
          {authLayoutStates.secondMenu[authLayoutStates.firstMenuKey]}
        </div>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Row justify="space-between" style={{ margin: '0 16px' }}>
            <Col>
              <Input
                prefix={<UserAddOutlined />}
                placeholder="Search by email"
                onChange={(e) =>
                  dispatch(
                    actions.authLayoutSlice.setSearchEmail(e.target.value)
                  )
                }
                value={authLayoutStates.searchEmail}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearch();
                  }
                }}
              />
            </Col>
            <Col>
              <Dropdown
                trigger={['click']}
                menu={{
                  items: [
                    {
                      label: (
                        <Button
                          //   onClick={() => {
                          //     signOut(auth);
                          //     dispatch(thunks.auth.setSession({ session: {} }));
                          //   }}
                          icon={<LogoutOutlined />}
                          type="link"
                          danger
                        >
                          Log out
                          {/* ({authStates.session.user?.email}) */}
                        </Button>
                      ),
                      key: '0',
                    },
                  ],
                }}
              >
                <Space>
                  <Button>
                    <MenuOutlined />
                  </Button>
                </Space>
              </Dropdown>
            </Col>
          </Row>
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
          >
            {authLayoutStates.pages[authLayoutStates.secondMenuKey]}
          </div>
          {authLayoutStates.addFriendPopUpVisible && <AddFriendPopup />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
