import {
  createSlice,
  ActionReducerMapBuilder,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { TeamOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import { Badge, type MenuProps } from 'antd';
import SecondMenuFriends from './second-menu-friends';
import FriendsList from '../friends-list';
import { ISession, InitISession } from '../../../app/pages/sign-up/@types';
import {
  collection,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { store } from '@mr-pepper/firebase';

type MenuItem = Required<MenuProps>['items'][number];
type State = {
  firstMenuKey: string;
  secondMenuKey: string;
  firstMenu: any[];
  secondMenuFriendsMenu: any[];
  secondMenu: { [x: string]: React.ReactNode };
  secondMenuKeys: { [x: string]: string };
  pages: { [x: string]: React.ReactElement };
  searchEmail: string;
  searchedFriend: ISession;
  addFriendPopUpVisible: boolean;
};

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const firstMenuKeys = {
  Home: 'Home',
  friends: 'Friends',
  settings: 'Settings',
};

const secondMenuKeys = {
  friends: 'Friends',
  groups: 'Groups',
  friendrequest: 'Friend Request',
  profile: 'Profile',
};

export const thunkSearchFriendByEmail = createAsyncThunk(
  'search-friend-by-email',
  async (arg: { email: string }) => {
    console.log('fire');
    const { email } = arg;
    const q = query(
      collection(store, 'sessions'),
      where('email', '==', email),
      limit(1)
    );
    return await getDocs(q)
      .then(async (x) => {
        if (x.docs.length) {
          const d = x.docs[0];
          return {
            ...d.data(),
            uid: d.id,
            user: await getDoc(d.data().user).then((x: any) => ({
              ...x.data(),
              uid: x.id,
            })),
          };
        }
        throw new Error('User not found');
      })
      .catch((e) => {
        throw new Error(
          JSON.stringify({
            status: false,
            message: e.message,
          })
        );
      });
  }
);

const initialState: State = {
  firstMenuKey: firstMenuKeys['friends'],
  secondMenuKey: '',

  secondMenuKeys,

  firstMenu: [
    getItem(firstMenuKeys['Home'], firstMenuKeys['Home'], <HomeOutlined />),
    getItem(
      firstMenuKeys['friends'],
      firstMenuKeys['friends'],
      <TeamOutlined />
    ),
    getItem(
      firstMenuKeys['settings'],
      firstMenuKeys['settings'],
      <SettingOutlined />
    ),
  ],
  secondMenu: {
    [firstMenuKeys['Home']]: <div>Home</div>,
    [firstMenuKeys['friends']]: <SecondMenuFriends />,
    [firstMenuKeys['settings']]: <div>settings</div>,
  },

  secondMenuFriendsMenu: [
    getItem(secondMenuKeys['friends'], secondMenuKeys['friends']),
    getItem(secondMenuKeys['groups'], secondMenuKeys['groups']),
    getItem(
      <Badge offset={[20, 0]} count={1}>
        {secondMenuKeys['friendrequest']}
      </Badge>,
      secondMenuKeys['friendrequest']
    ),
  ],

  pages: {
    [secondMenuKeys['friends']]: <FriendsList />,
  },

  searchEmail: '',
  searchedFriend: InitISession,
  addFriendPopUpVisible: false,
};

const layoutSlice = createSlice({
  name: 'layoutSlice',
  initialState,
  reducers: {
    setFirstMenuKey: (state: State, action) => {
      state.firstMenuKey = action.payload;
    },
    setSecondMenuKey: (state: State, action) => {
      state.secondMenuKey = action.payload;
    },
    setAddFriendPopUpVisible: (state: State, action) => {
      state.addFriendPopUpVisible = action.payload;
    },
    setSearchEmail: (state: State, action) => {
      state.searchEmail = action.payload;
    },
    clearSearch: (state: State) => {
      state.searchEmail = "";
      state.searchedFriend = InitISession;
      state.addFriendPopUpVisible = false;
    },
  },
  extraReducers: (buider: ActionReducerMapBuilder<State>) => {
    buider.addCase(
      thunkSearchFriendByEmail.fulfilled,
      (state: State, action) => {
        state.searchedFriend = {
          ...InitISession,
          ...action.payload,
        } as ISession;
      }
    );
    buider.addCase(
      thunkSearchFriendByEmail.rejected,
      (state: State, action) => {
        state.searchedFriend = InitISession;
      }
    );
  },
});

export default layoutSlice;
