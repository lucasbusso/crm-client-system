import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import { registerSlice } from "./slices/register.slice";

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    registerReducer: registerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
