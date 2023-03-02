import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

//async request to the backend for registration
export const fetchRegistrationData = createAsyncThunk(
  'authorization/fetchRegistrationData',
  async (params) => {
    try {
      const { data } = await axios.post('/authorization/registration', params);
      return data;
    } catch (err) {
      const { message } = err.response.data;
      throw new Error(message);
    }
  }
);
//async request to the backend for authorization
export const fetchUserData = createAsyncThunk('authorization/fetchUserData', async (params) => {
  try {
    const { data } = await axios.post('/authorization/authorization', params);
    return data;
  } catch (err) {
    const { message } = err.response.data;
    throw new Error(message);
  }
});
//async request to the backend for authorization by token
export const fetchToken = createAsyncThunk('/authorization/fetchToken', async () => {
  const { data } = await axios.get('/authorization/verification');
  return data;
});

export const isAuthCheck = (state) => Boolean(state.authorization.userData);

const initialState = {
  userData: null,
  status: 'loading'
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logOut: (state) => {
      state.userData = null;
    }
  },
  extraReducers: {
    [fetchRegistrationData.pending]: (state) => {
      state.userData = null;
      state.status = 'loading';
    },
    [fetchRegistrationData.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.status = 'loaded';
    },
    [fetchRegistrationData.rejected]: (state) => {
      state.userData = null;
      state.status = 'error';
    },
    [fetchUserData.pending]: (state) => {
      state.userData = null;
      state.status = 'loading';
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.status = 'loaded';
    },
    [fetchUserData.rejected]: (state) => {
      state.userData = null;
      state.status = 'error';
    },
    [fetchToken.pending]: (state) => {
      state.userData = null;
      state.status = 'loading';
    },
    [fetchToken.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.status = 'loaded';
    },
    [fetchToken.rejected]: (state) => {
      state.userData = null;
      state.status = 'error';
    }
  }
});

export const { logOut } = authorizationSlice.actions;

export default authorizationSlice.reducer;
