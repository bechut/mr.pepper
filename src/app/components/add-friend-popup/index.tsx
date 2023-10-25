import {
  Modal,
  Space,
  Image,
  Typography,
  Button,
  Row,
  Col,
  Card,
  Form,
  Input,
} from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
//   import { RootState } from "../../../redux";
//   import { actions, thunks } from "../../../redux/reducers";
import { MessageOutlined, UserAddOutlined } from '@ant-design/icons';
import { AppDispatch, RootState, actions } from '../../../assets/redux/store';
import { auth } from '@mr-pepper/firebase';

export default function AddFriendPopup() {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const authLayoutStates = useSelector(
    (states: RootState) => states.authLayoutSlice,
    shallowEqual
  );

  let btns = (
    <Row gutter={[12, 12]}>
      <Col sm={12}>
        <Button
          icon={<UserAddOutlined />}
          size="large"
          style={{ width: '100%' }}
        >
          Add Friend
        </Button>
      </Col>
      <Col sm={12}>
        <Button
          icon={<MessageOutlined />}
          size="large"
          style={{ width: '100%' }}
        >
          Inbox
        </Button>
      </Col>
    </Row>
  );

  if (auth.currentUser?.email === authLayoutStates.searchedFriend.email)
    btns = <div />;

  return (
    <Modal
      styles={{ body: { backgroundColor: 'rgb(245 245 245)' } }}
      onCancel={() => {
        dispatch(actions.authLayoutSlice.clearSearch());
      }}
      footer={null}
      title="Add Friend"
      open={authLayoutStates.addFriendPopUpVisible}
    >
      <Space direction="vertical" style={{ width: '100%' }} size={'large'}>
        <Card style={{ borderRadius: 0 }}>
          <Space
            direction="vertical"
            style={{ width: '100%', textAlign: 'center', position: 'relative' }}
          >
            <Image
              style={{ height: 200, width: '100%' }}
              src={authLayoutStates.searchedFriend.user.avatar || '/avatar.png'}
            />
            <Image
              src={
                authLayoutStates.searchedFriend.user.photoUrl || '/avatar.png'
              }
              style={{
                height: 100,
                width: 100,
                border: '4px solid #d4d4d4',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translate(-50%,20%)',
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 8,
              }}
            />
            <Typography.Title level={4}>
              {authLayoutStates.searchedFriend.user.displayName}
            </Typography.Title>
            {btns}
          </Space>
        </Card>
        <Card style={{ borderRadius: 0 }}>
          <Typography.Title style={{ marginTop: 0 }} level={4}>
            Profile
          </Typography.Title>
          <Form form={form} labelCol={{ span: 8 }} labelAlign="left">
            <Form.Item label="Email">
              <Input
                bordered={false}
                value={authLayoutStates.searchedFriend.email}
              />
            </Form.Item>
            <Form.Item label="Name">
              <Input
                bordered={false}
                value={authLayoutStates.searchedFriend.user.displayName}
              />
            </Form.Item>
            <Form.Item label="Gender">
              <Input
                bordered={false}
                value={authLayoutStates.searchedFriend.user.gender || '---'}
              />
            </Form.Item>
            <Form.Item label="DoB">
              <Input
                bordered={false}
                value={authLayoutStates.searchedFriend.user.dob || '---'}
              />
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Modal>
  );
}
