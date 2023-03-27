import { createSlice } from "@reduxjs/toolkit";
import { AuthStatus } from "../../interfaces/index";

// add interface about products
interface User {
  name: string;
  uid: string;
  isAdmin: boolean;
}

interface Initials {
  status: AuthStatus;
  user?: User;
  errorMessage?: string;
}

const initialState: Initials = {
  status: "checking",
};

export const authSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = undefined;
      state.errorMessage = undefined;
    },
    onLogin: (state, action) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = undefined;
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
export default authSlice.reducer;
