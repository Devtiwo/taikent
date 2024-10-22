import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const baseUrl = "http://localhost:5000";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    status: "idle",
    message: null,
    user: null,
    token: null
  },
  reducers: {
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.status = "idle";
      state.user = null;
      state.token = null;
    },
    clearMessage: (state) => {
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isLoggedIn = false;
        state.message = action.payload;
      });
  },
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/signup`, values);
      if (response.data.status) {
        return response.data.message;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (err) {
      return rejectWithValue("Signup failed! Please try again.");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, values);
      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        return { token: response.data.token, message: response.data.message, user: response.data.user};
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (err) {
      return rejectWithValue("Login failed! Please try again");
    }
  }
);

export const { logoutSuccess, clearMessage } = authSlice.actions;
export default authSlice.reducer;
