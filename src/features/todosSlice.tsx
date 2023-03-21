import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  due_on: string;
  status: string;
}




export const getTodosAsync = createAsyncThunk<Todo[],{ id: string | undefined; token: string }>(
  "todos/getTodosAsync",
  async ({ id, token }:{ id: string | undefined; token: string }) => {
    try {
      const { data } = await axios.get<Todo[]>(
        `https://gorest.co.in/public/v2/users/${id}/todos`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      return data;
    } catch (error: any) {
      alert(error.message);
      throw error; // rethrow the error to mark the action as rejected
    }
  }
);

export interface AddTodoPayload {
  user_id: any;
  title: string;
  due_on: string;
  status: string;
  token: string;
  id: string | undefined;
}



export const addTodo = createAsyncThunk<Todo, AddTodoPayload>(
  "addTodo/addTodoAsync",
  async function (payload) {
    const { title, due_on, status,token,id } = payload;
    const body = JSON.stringify({ title, due_on, status });
    const data = await fetch(
      `https://gorest.co.in/public/v2/users/${id}/todos`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      }
    ).then(function (response) {
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return response.json() as Promise<Todo>;
    });
    getTodosAsync({token, id});
    console.log(data);
    return data;
  }
);

interface TodosState {
  todos: Todo[];
  todo: Todo | {};
  loading: boolean;
  error: boolean;
}

const initialState: TodosState = {
  todos: [],
  todo: {},
  loading: false,
  error: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.error = false;
      })
      .addCase(getTodosAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todo = action.payload;
        state.todos = [action.payload, ...state.todos];
        state.error = false;
      })
      .addCase(addTodo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default todosSlice.reducer;
