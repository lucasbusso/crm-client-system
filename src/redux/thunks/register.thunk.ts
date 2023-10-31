import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerService } from "../../services/register.service";
import { User } from "../../interfaces/form.interface";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (
    { firstName, lastName, ownBusiness, email, password, role }: User,
    { rejectWithValue }
  ) => {
    try {
      const response = await registerService({
        firstName,
        lastName,
        ownBusiness,
        email,
        password,
        role,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
