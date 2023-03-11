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
    },
    [fetchAddComment.fulfilled]: (state, action) => {
      state.comments.unshift(action.payload);
    },
    [fetchAddComment.rejected]: (state, action) => {
      alert(action.error.message);
    },
    [fetchLastComments.pending]: (state) => {
      state.lastComments = [];
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.lastComments = action.payload;
    },
    [fetchLastComments.rejected]: (state, action) => {
      console.log(action.error.message);
    }
  }
});

export const { removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
