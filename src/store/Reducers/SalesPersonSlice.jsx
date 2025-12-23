import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salesperson: [], // For sales summary data
  salespersonlist: [], // For sales person dropdown options
  loading: false,
  success: false,
  error: null,
};

export const salespersonSlice = createSlice({
  name: "salesperson",
  initialState,
  reducers: {
    fetchSalesPersonStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchSalesPersonSuccess: (state, action) => {
      state.loading = false;
      state.salesperson = action.payload;
      state.success = true;
    },
    fetchSalesPersonFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSalesEmployees: (state, action) => {
      state.salespersonlist = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSalesPersonStart,
  fetchSalesPersonSuccess,
  fetchSalesPersonFailure,
  setSalesEmployees,
  fetchFailure,
} = salespersonSlice.actions;

export default salespersonSlice.reducer;