import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../Components/UsersTable";

export interface Person {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface UserState {
  users: Person[];
  person: Person;
  loading: boolean;
  error: boolean;
}

const initialState: UserState = {
  users: [],
  person: { id: 0, name: "", email: "", gender: "", status: "" },
  loading: false,
  error: false,
};

export const getBudgetAsync = createAsyncThunk(
  "budget/getBudgetAsync",
  async ({ eleman, token }: { eleman: number; token: string }) => {
    try {
      const { data } = await axios(
        `https://gorest.co.in/public/v2/users?per_page=${eleman}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token ? token : ""}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      alert(error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "addUser/addUserAsync",
  async ({
    eleman,
    token,
    newUser,
  }: {
    eleman: number;
    token: string;
    newUser: User;
  }) => {
    const body = JSON.stringify(newUser);
    const dat = await fetch("https://gorest.co.in/public/v2/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    })
      .then(function (response: any) {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(function (data) {
        getBudgetAsync({ eleman, token });
        console.log(data);
        return data;
      });
    return dat;
  }
);

// Put changed user`s data to API
export const putUser = createAsyncThunk(
  "putUser/putUserAsync",
  async ({
    eleman,
    token,
    user,
  }: {
    eleman: number;
    token: string;
    user: Person;
  }) => {
    const url = `https://gorest.co.in/public/v2/users/${user.id}`;
    const body = JSON.stringify(user);
    const settings = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    };
    try {
      const fetchResponse = await fetch(url, settings);

      if (fetchResponse.status === 401) {
        return { message: "Authantication failed.", ok: fetchResponse.ok };
      }
      if (fetchResponse.status === 422) {
        return { message: "Enter correct data.", ok: fetchResponse.ok };
      }
      if (!fetchResponse.ok) {
        return { message: "Somethings went wrong.", ok: fetchResponse.ok };
      }
      const data = await fetchResponse.json();
      console.log(data);
      getBudgetAsync({ eleman, token });
      return { message: data, ok: fetchResponse.ok };
    } catch (e: any) {
      throw new Error(e);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser/deleteUserAsync",
  async function ({
    id,
    token,
    eleman,
  }: {
    eleman: number;
    token: string;
    id: string | number;
  }) {
    await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    getBudgetAsync({ eleman, token });
    return id;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBudgetAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBudgetAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.person?.id ? state.users : action.payload;
        state.error = false;
      })
      .addCase(getBudgetAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(putUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(putUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((item) =>
          item.id === action.payload.message.id ? action.payload.message : item
        ) as never[];
        state.error = false;
      })
      .addCase(putUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.person = action.payload;
        state.users = [action.payload, ...state.users];
        state.error = false;
      })
      .addCase(addUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.users = state.users.filter((item) => item.id !== action.payload);
        state.error = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default userSlice.reducer;
