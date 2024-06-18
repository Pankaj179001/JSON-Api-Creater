import { configureStore } from "@reduxjs/toolkit";
import CreateApiSlice from "../Slices/CreateApiSlice";

export const store = configureStore({
  reducer: { api: CreateApiSlice },
  middleware: (arg) => arg().concat(),
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
