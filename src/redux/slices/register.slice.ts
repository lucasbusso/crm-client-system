import { createSlice } from "@reduxjs/toolkit";
import { registerThunk } from "../thunks/register.thunk";

interface RegisterState {
  success: boolean;
  error: any;
  loading: boolean;
}

const initialState: RegisterState = {
  success: false,
  error: null,
  loading: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    register: (state) => {
      state.success = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      return { ...state, loading: true, error: null };
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error };
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      if (action.payload.data) {
        return {
          ...state,
          loading: false,
          success: true,
        };
      } else {
        return {
          ...state,
          error: action.payload,
          loading: false,
          success: false,
        };
      }
    });
  },
});
export const { register } = registerSlice.actions;

export default registerSlice.reducer;
