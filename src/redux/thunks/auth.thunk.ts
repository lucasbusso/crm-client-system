import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthCredentials } from "../../interfaces/redux.interface";
import { loginService } from "../../services/auth/login.service";

export const authThunk = createAsyncThunk(
  "auth/authenticate",
  async ({ email, password }: AuthCredentials, { rejectWithValue }) => {
    try {
      const response = await loginService({ email, password });
      if (response.data.error) return response.data.error;
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { token, user } = await response?.data;
      return { token, user };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
