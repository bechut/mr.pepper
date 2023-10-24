import { configureStore } from '@reduxjs/toolkit';
import routerSlice from '../../routers/reducer';
import sampleSlice from '../../app/pages/sample/reducer';
import signupSlice, { thunkSignUp } from '../../app/pages/sign-up/reducer';

export const reduxStore = configureStore({
  reducer: {
    routerSlice: routerSlice.reducer,
    sampleSlice: sampleSlice.reducer,
    signupSlice: signupSlice.reducer,
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
};

export const thunks = {
  signupSlice: {
    signUp: thunkSignUp,
  },
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
