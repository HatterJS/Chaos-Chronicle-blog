import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

//async request to the backend to getting all articles
export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const { data } = await axios.get('/articles');
  return data;
});
//async request to the backend to getting popular tags
export const fetchTags = createAsyncThunk('articles/fetchTags', async () => {
  const { data } = await axios.get('/tags');
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
    //getting all articles
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
    },
    //getting articles tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    }
  }
});

// export const { createArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
