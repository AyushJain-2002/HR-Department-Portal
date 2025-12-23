import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salessummary: [],
  loading: false,
  success: false,
  error: null,
};

export const salessummarySlice = createSlice({
  name: "salessummary",
  initialState,
  reducers: {
    fetchSalesSummaryStart: (state) => {
      state.loading = true;
      state.error = null;
      state.salessummary = [];
      state.success = false;
    },
    fetchSalesSummarySuccess: (state, action) => {
      state.loading = false;
      state.salessummary = action.payload;
      state.success = true;
    },
    fetchSalesSummaryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSalesSummaryStart,
  fetchSalesSummarySuccess,
  fetchSalesSummaryFailure,
} = salessummarySlice.actions;

export default salessummarySlice.reducer;
