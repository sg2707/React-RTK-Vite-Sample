import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/launches/appSlice";
import { launchApi } from "./services/launches/launchApi";

export const store = configureStore({
  reducer: {
    // ? Add the authReducer to the reducer object
    authState: authReducer,
    [launchApi.reducerPath]: launchApi.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  // ? Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([launchApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
