import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const { data } = await axios.get('/articles');
  return data;
});

const initialState = {
  articles: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  }
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.articles.items = [];
      state.articles.status = 'loading';
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.articles.items = action.payload;
      state.articles.status = 'loaded';
    },
    [fetchArticles.rejected]: (state) => {
      state.articles.items = [];
      state.articles.status = 'error';
    }
  }
});

export const { createArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
