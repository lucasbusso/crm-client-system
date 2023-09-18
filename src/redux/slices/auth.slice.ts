import { createSlice } from "@reduxjs/toolkit";
import { authThunk } from "../thunks/auth.thunk";
import { RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { expirationTokenAuth, getCookie, tokenDecode } from "../../utils";
import { TokenFirebase } from "../../interfaces/firebase.interface";

interface AuthState {
  isAuth: boolean;
  success: boolean;
  error: RejectedActionFromAsyncThunk<any> | null;
  loading: boolean;
  userData: {
    email: string | null;
    uid: string | null;
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
          email: tokenDecode<TokenFirebase>(getCookie("accessToken")!).email,
          uid: tokenDecode<TokenFirebase>(getCookie("accessToken")!).sub,
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
      return (state = { ...initialState, loading: true });
    });
    builder.addCase(authThunk.rejected, (state, action) => {
      return (state = { ...initialState, loading: false, error: action.error });
    });
    builder.addCase(authThunk.fulfilled, (state, action) => {
      return (state = {
        ...initialState,
        loading: false,
        success: true,
        accessToken: action.payload.accessToken,
        isAuth: true,
        isExpired: false,
        userData: action.payload.userData,
      });
    });
  },
});

export const { login, logout } = authSlice.actions;
