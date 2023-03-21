import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export interface UserState {
  currentUser: string | null;
  token: string | null;
  loading: boolean;
  error: boolean;
  eleman: number;
  status:number |undefined
}

const initialState: UserState = {
  currentUser: "",
  loading: false,
  error: false,
  token: null,
  eleman: 10,
  status: 0,
};

export const handleLogin = createAsyncThunk(
  "login/getLoginAsync",
  async ( token: string ) => {
    try {
      const response = await fetch("https://gorest.co.in/public/v2/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });


      return response.status
    } catch (error:any) {
      console.log(error.message);
    }


  }
);


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
      state.status = 0;
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
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(handleLogin.fulfilled, (state,{payload}) => {
        state.status = payload
        state.loading = false;
state.error=true
      })
      .addCase(handleLogin.rejected, (state) => {
        state.loading = false;
  state.error = false;
      });
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
