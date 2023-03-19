import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  currentUser: string | null;
  token: string | null;
  loading: boolean;
  error: boolean;
  eleman: number;
}

const initialState: UserState = {
  currentUser: "",
  loading: false,
  error: false,
  token: null,
  eleman: 10,
};

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.currentUser;
      state.token = payload?.token;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.token = null;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    pagePlus: (state) => {
      state.eleman = state.eleman + 1;
    },
    pageMinus: (state) => {
      state.eleman = state.eleman - 1;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  fetchFail,
  pagePlus,
  pageMinus,
} = authSlice.actions;
export default authSlice.reducer;
