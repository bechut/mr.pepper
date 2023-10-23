import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { ISession, ISignup, InitISession } from './@types';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, store } from '@mr-pepper/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import i18next from '../../../assets/locales';

type IState = {
  loading: boolean;
  session: ISession;
};

const initialState: IState = { loading: false, session: InitISession };

export const thunkSignUp = createAsyncThunk('signup', async (arg: ISignup) => {
  const { email, password, username } = arg;
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (credential: UserCredential) => {
      const user = credential.user;
      await updateProfile(user, {
        displayName: username,
      });
      return user;
    })
    .then(async (user: User) => {
      await setDoc(doc(collection(store, 'users'), user.uid), {
        email,
        displayName: username,
        photoURL: '',
        avatar: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return user;
    })
    .then((user: User) => sendEmailVerification(user))
    .then(async () => await signOut(auth))
    .then(() => ({
      status: true,
      message: i18next.t('sign-up:success-msg?create_account_success'),
    }))
    .catch((e) => {
      if (auth.currentUser) deleteUser(auth.currentUser);
      const msg: { [key: string]: string } = {
        'Firebase: Error (auth/email-already-in-use).': i18next.t(
          'sign-up:error-msg?email_in_use'
        ),
      };
      throw new Error(
        JSON.stringify({
          status: false,
          message: msg[e.message] || e.messasge,
        })
      );
    });
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (buider: ActionReducerMapBuilder<IState>) => {
    // addCase before addMatcher
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

export default authSlice;
