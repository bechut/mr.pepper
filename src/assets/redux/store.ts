import { configureStore } from '@reduxjs/toolkit';
import routerSlice from '../../routers/reducer';
import sampleSlice from '../../app/pages/sample/reducer';
import signupSlice, { thunkSignUp } from '../../app/pages/sign-up/reducer';
import loginSlice, { thunkLogin, thunkSetSessionAsync } from '../../app/pages/login/reducer';

import authLayoutSlice, {
  thunkSearchFriendByEmail,
} from '../../app/components/auth-layout/reducer';

export const reduxStore = configureStore({
  reducer: {
    routerSlice: routerSlice.reducer,
    sampleSlice: sampleSlice.reducer,
    signupSlice: signupSlice.reducer,
    loginSlice: loginSlice.reducer,
    authLayoutSlice: authLayoutSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const actions = {
  routerSlice: routerSlice.actions,
  sampleSlice: sampleSlice.actions,
  signupSlice: signupSlice.actions,
  loginSlice: loginSlice.actions,
  authLayoutSlice: authLayoutSlice.actions,
};

export const thunks = {
  signupSlice: {
    signUp: thunkSignUp,
  },
  loginSlice: {
    login: thunkLogin,
    setSessionAsync: thunkSetSessionAsync
  },
  authLayoutSlice: {
    searchFriendByEmail: thunkSearchFriendByEmail,
  },
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
