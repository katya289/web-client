// alertSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  message: '',
  type: 'info' 
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(state, action) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearAlert(state) {
      state.isOpen = false;
      state.message = '';
      state.type = 'info';
    }
  }
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
