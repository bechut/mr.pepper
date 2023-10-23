import { configureStore } from '@reduxjs/toolkit';
import routerSlice from '../../routers/reducer';
import sampleSlice from '../../app/pages/sample/reducer';
import authSlice, { thunkSignUp } from '../../app/pages/sign-up/reducer';

export const reduxStore = configureStore({
  reducer: {
    routerSlice: routerSlice.reducer,
    sampleSlice: sampleSlice.reducer,
    authSlice: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const actions = {
  routerSlice: routerSlice.actions,
  sampleSlice: sampleSlice.actions,
  authSlice: authSlice.actions,
};

export const thunks = {
  authSlice: {
    signUp: thunkSignUp,
  },
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
