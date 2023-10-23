import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerService } from "../../services/register.service";
import { User } from "../../interfaces/form.interface";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ email, password, name, age }: User, { rejectWithValue }) => {
    try {
      const response = await registerService({ email, password, name, age });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
