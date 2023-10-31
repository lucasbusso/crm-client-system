import { createSlice } from "@reduxjs/toolkit";
import { RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import {
  TokenJWT,
  expirationTokenAuth,
  getCookie,
  tokenDecode,
} from "../../utils";
import { authThunk } from "../thunks/auth.thunk";

interface AuthState {
  isAuth: boolean;
  success: boolean;
  error: RejectedActionFromAsyncThunk<any> | null;
  loading: boolean;
  userData: {
    email: string | null;
    uid: string | null;
    firstName: string | null;
    role: "user" | "admin" | null;
  } | null;
  accessToken: string | null | undefined;
  isExpired: boolean | null;
}

const initialState: AuthState = {
  isAuth:
    getCookie("accessToken") !== undefined
      ? !expirationTokenAuth(getCookie("accessToken")!)
      : false,
  accessToken:
    getCookie("accessToken") !== undefined ? getCookie("accessToken") : null,
  error: null,
  isExpired:
    getCookie("accessToken") !== undefined
      ? expirationTokenAuth(getCookie("accessToken")!)
      : null,
  loading: false,
  success: getCookie("accessToken") !== undefined,
  userData:
    getCookie("accessToken") !== undefined
      ? {
          email: tokenDecode<TokenJWT>(getCookie("accessToken")!).email,
          uid: tokenDecode<TokenJWT>(getCookie("accessToken")!)._id,
          firstName: tokenDecode<TokenJWT>(getCookie("accessToken")!).name,
          role: tokenDecode<TokenJWT>(getCookie("accessToken")!).role,
        }
      : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authThunk.pending, (state) => {
      return { ...state, loading: true, error: null };
    });
    builder.addCase(authThunk.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error };
    });
    builder.addCase(authThunk.fulfilled, (state, action) => {
      if (action.payload.token) {
        const { token, user } = action.payload;
        return {
          ...state,
          loading: false,
          success: true,
          accessToken: token,
          isAuth: true,
          isExpired: false,
          userData: user,
        };
      } else {
        return {
          ...state,
          error: action.payload,
          loading: false,
          success: false,
          accessToken: null,
          isAuth: false,
          isExpired: false,
          userData: null,
        };
      }
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
