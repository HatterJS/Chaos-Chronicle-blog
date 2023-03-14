import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchAuthors = createAsyncThunk('/authors/fetchAuthors', async () => {
  const { data } = await axios.get('/authors');
  return data;
});

const initialState = {
  authors: [],
  status: 'loading'
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAuthors.pending]: (state) => {
      state.authors = [];
      state.status = 'loading';
    },
    [fetchAuthors.fulfilled]: (state, action) => {
      state.authors = action.payload;
      state.status = 'loaded';
    },
    [fetchAuthors.rejected]: (state) => {
      state.authors = [];
      state.status = 'error';
    }
  }
});

export default authorsSlice.reducer;
