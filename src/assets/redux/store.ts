import { configureStore } from '@reduxjs/toolkit';

import { routes } from '../../routers/routes';

const reducers = routes
  .map((route) => route.reducer)
  .reduce((_, item) => ({ [item.name]: item.reducer }), {});

export const actions = routes
  .map((route) => route.reducer)
  .reduce((_, item) => ({ [item.name]: item.actions }), {});

export const reduxStore = configureStore({
  reducer: reducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
