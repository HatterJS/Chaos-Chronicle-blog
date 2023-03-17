import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (id) => {
  const { data } = await axios.get(`/comments/${id}`);
  return data;
});
export const fetchAddComment = createAsyncThunk(
  '/comments/fetchAddComment',
  async (commentData) => {
    try {
      const { data } = await axios.post('/comment', commentData);
      return data;
    } catch (err) {
      const { message } = err.response.data;
      throw new Error(message);
    }
  }
);
export const fetchLastComments = createAsyncThunk('/comments/fetchLastComments', async (limit) => {
  try {
    const { data } = await axios.get(`/lastcomments?limit=${limit}`);
    return data;
  } catch (err) {
    const { message } = err.response.data;
    throw new Error(message);
  }
});

const initialState = {
  comments: [],
  lastComments: [],
  status: 'loading'
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      state.comments = state.comments.filter((item) => item._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.comments = [];
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchComments.rejected, (state) => {
        state.comments = [];
        state.status = 'error';
      })
      .addCase(fetchAddComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(fetchAddComment.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(fetchLastComments.pending, (state) => {
        state.lastComments = [];
        state.status = 'loading';
      })
      .addCase(fetchLastComments.fulfilled, (state, action) => {
        state.lastComments = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchLastComments.rejected, (state, action) => {
        console.log(action.error.message);
        state.lastComments = [];
        state.status = 'error';
      });
  }
});

export const { removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
