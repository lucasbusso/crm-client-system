import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthCredentials } from "../../interfaces/redux.interface";
import { loginService } from "../../services/login.service";

export const authThunk = createAsyncThunk(
  "auth/authenticate",
  async ({ email, password }: AuthCredentials, { rejectWithValue }) => {
    try {
      const response = await loginService({ email, password });
      if (response === undefined) return undefined;
      const { token, user } = await response?.data;
      return { token, user };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
