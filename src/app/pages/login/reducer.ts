import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { ILogin, ISession, InitISession } from './@types';
import {
  User,
  UserCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, messaging, store } from '@mr-pepper/firebase';
import { getToken } from 'firebase/messaging';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import i18next from '../../../assets/locales';

type IState = {
  loading: boolean;
  session: ISession;
};

const initialState: IState = { loading: false, session: InitISession };

export const thunkLogin = createAsyncThunk(
  'login',
  async (arg: ILogin & { ip: string }) => {
    const { email, password, ip } = arg;
    return signInWithEmailAndPassword(auth, email, password)
      .then((credential: UserCredential) => credential.user)
      .then((user: User) => {
        if (!user.emailVerified) {
          throw new Error(i18next.t('log-in:success-msg?email_not_verified'));
        }
        return user;
      })
      .then(async (user: User) => {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env['VITE_MESSAGE_ID'],
        }).then((x) => x);
        return { user, token };
      })
      .then(async ({ user, token }: { user: User; token: string }) => {
        return {
          session: getDoc(doc(store, 'sessions', user.uid)).then((x) => ({
            ...x.data(),
            uid: x.id,
          })),
          user,
          token,
        };
      })
      .then(
        ({
          session,
          user,
          token,
        }: {
          session: any;
          user: User;
          token: string;
        }) => {
          return { user, token, sessionExist: session.exists };
        }
      )
      .then(
        async ({
          user,
          token,
          sessionExist,
        }: {
          user: User;
          token: string;
          sessionExist: boolean;
        }) => {
          const payload = {
            email: user.email,
            token: user.refreshToken,
            messagingToken: token,
            ua: window.navigator.userAgent,
            ip,
            expired: moment().add(1, 'hour').toDate(),
            user: doc(store, 'users', user.uid),
          };
          if (sessionExist) {
            await updateDoc(doc(store, 'sessions', user.uid), payload);
          } else {
            await setDoc(doc(store, 'sessions', user.uid), payload);
          }
          return user;
        }
      )
      .then(() => ({
        status: true,
        message: i18next.t('log-in:success-msg?login_success'),
      }))
      .catch((e) => {
        console.log(e);
        const msg: { [key: string]: string } = {
          'Firebase: Error (auth/invalid-email).': i18next.t(
            'log-in:error-msg?email_invalid'
          ),
        };
        throw new Error(
          JSON.stringify({
            status: false,
            message:
              msg[e.message] ||
              e.messasge ||
              i18next.t('log-in:error-msg?unknow'),
          })
        );
      });
  }
);

const loginSlice = createSlice({
  name: 'sampleSlice',
  initialState,
  reducers: {},
  extraReducers: (buider: ActionReducerMapBuilder<IState>) => {
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('pending') !== -1;
      },
      (state: IState) => {
        state.loading = true;
      }
    );
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('fulfilled') !== -1;
      },
      (state: IState) => {
        state.loading = false;
      }
    );
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('rejected') !== -1;
      },
      (state: IState) => {
        state.loading = false;
      }
    );
  },
});

export default loginSlice;
