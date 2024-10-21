import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const baseUrl = "https://taikent.onrender.com";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    status: "idle",
    message: null
  },
  reducers: {
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.status = "idle";
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
        state.message = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isLoggedIn = false,
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
        localStorage.token = response.data.token;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (err) {
      return rejectWithValue("Login failed! Please try again");
    }
  }
);

export const { loginSuccess, logoutSuccess, clearMessage } = authSlice.actions;
export default authSlice.reducer;
