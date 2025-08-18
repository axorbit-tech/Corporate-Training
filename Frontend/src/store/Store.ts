import { configureStore } from "@reduxjs/toolkit";
import { apiSlices } from "./slices/apiSlice";
import { userApiSlices } from "./slices/userApiSlice";

export const store = configureStore({
  reducer: {
    [apiSlices.reducerPath]: apiSlices.reducer,
    [userApiSlices.reducerPath]: userApiSlices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlices.middleware).concat(userApiSlices.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
