import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (id) => {
  const { data } = await axios.get(`/comments/${id}`);
  return data;
});

const initialState = {
  comments: [],
  status: 'loading'
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.comments = [];
      state.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments = [];
      state.status = 'loading';
    }
  }
});

export default commentsSlice.reducer;
