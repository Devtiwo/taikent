import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./authSlice";

export const updateBalance = createAsyncThunk(
  "user/updateBalance",
  async ({ userId, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${baseUrl}/user/${userId}/balances`, updates);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Error updating user");
    }
  }
);

export const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balances: {},
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(updateBalance.pending, (state) => {
      state.status = "loading";
    })
    .addCase(updateBalance.fulfilled, (state, action) => { 
       state.status = "succeeded";
       const userData = action.payload?.user || {};
       const { userId, plan, balance, profit, withdrawBal } = userData;
       if (userId) {
        state.balances[userId] = { plan, balance, profit, withdrawBal };
      } else {
        console.error("No userId found in payload!");
      }
    })
    .addCase(updateBalance.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  }
});

export default balanceSlice.reducer;