import { createAsyncThunk } from "@reduxjs/toolkit";
import * as auth from "firebase/auth";
import { authFirebase } from "../../config/firebase";

export const registerThunk = createAsyncThunk(
  "firebase/auth",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const registerGenerate = await auth.createUserWithEmailAndPassword(
        authFirebase,
        username,
        password
      );

      const { email, uid } = registerGenerate.user;
      const { token: accessToken, expirationTime } =
        await registerGenerate.user.getIdTokenResult();
      return {
        accessToken,
        expirationTime,
        userData: {
          email,
          uid,
        },
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
