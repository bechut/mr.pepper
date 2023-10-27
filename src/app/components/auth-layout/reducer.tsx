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
import i18next from 'i18next';
import { string } from 'yup';

const validating = () => {
  const isEmailSchema = string()
    .email(i18next.t('auth-layout:error-msg?invalid_email'))
    .required(i18next.t('auth-layout:error-msg?email_required'));
  return { isEmailSchema };
};

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
  validating: typeof validating;
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

const initFirstMenu = () => {
  const firstMenuKeys = {
    home: 'home',
    friends: 'friends',
    settings: 'settings',
  };

  const firstMenu = [
    getItem(
      i18next.t('auth-layout:first-menu-key?home'),
      firstMenuKeys['home'],
      <HomeOutlined />
    ),
    getItem(
      i18next.t('auth-layout:first-menu-key?friends'),
      firstMenuKeys['friends'],
      <TeamOutlined />
    ),
    getItem(
      i18next.t('auth-layout:first-menu-key?settings'),
      firstMenuKeys['settings'],
      <SettingOutlined />
    ),
  ];

  return { firstMenuKeys, firstMenu };
};

const initSecondMenu = () => {
  const secondMenuKeys = {
    friends: 'friends',
    groups: 'groups',
    friendrequest: 'friendrequest',
    profile: 'profile',
  };

  const secondMenuFriendsMenu = [
    getItem(
      i18next.t('auth-layout:second-menu-key?friends'),
      secondMenuKeys['friends']
    ),
    getItem(
      i18next.t('auth-layout:second-menu-key?groups'),
      secondMenuKeys['groups']
    ),
    getItem(
      <Badge offset={[20, 0]} count={1}>
        {i18next.t('auth-layout:second-menu-key?friendrequest')}
      </Badge>,
      secondMenuKeys['friendrequest']
    ),
  ];

  return { secondMenuKeys, secondMenuFriendsMenu };
};

const { firstMenuKeys, firstMenu } = initFirstMenu();
const { secondMenuKeys, secondMenuFriendsMenu } = initSecondMenu();

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
        throw new Error(i18next.t('auth-layout:error-msg?user_not_found'));
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

  firstMenu,
  secondMenu: {
    [firstMenuKeys['home']]: <div>Home</div>,
    [firstMenuKeys['friends']]: <SecondMenuFriends />,
    [firstMenuKeys['settings']]: <div>settings</div>,
  },

  secondMenuFriendsMenu,

  pages: {
    [secondMenuKeys['friends']]: <FriendsList />,
  },

  searchEmail: '',
  searchedFriend: InitISession,
  addFriendPopUpVisible: false,
  validating,
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
      state.searchEmail = '';
      state.searchedFriend = InitISession;
      state.addFriendPopUpVisible = false;
    },
    localeChange: (state: State, action) => {
      i18next.changeLanguage(action.payload);
      const { firstMenu } = initFirstMenu();
      const { secondMenuFriendsMenu } = initSecondMenu();
      state.firstMenu = firstMenu;
      state.secondMenuFriendsMenu = secondMenuFriendsMenu;
      state.validating = validating;
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
