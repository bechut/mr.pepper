import { configureStore } from '@reduxjs/toolkit';
import routerSlice from '../../routers/reducer';
import sampleSlice from '../../app/pages/sample/reducer';

export const reduxStore = configureStore({
  reducer: {
    routerSlice: routerSlice.reducer,
    sampleSlice: sampleSlice.reducer,
  },
});

export const actions = {
  routerSlice: routerSlice.actions,
  sampleSlice: sampleSlice.actions,
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
