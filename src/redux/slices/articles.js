import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

//async request to the backend to getting all articles
export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (params) => {
  const { data } = await axios.get(`/articles`, { params });
  return data;
});
//async request to the backend to getting popular tags
export const fetchTags = createAsyncThunk('articles/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});
//async request to the backend to getting author articles
export const fetchAuthorArticles = createAsyncThunk('/articles/fetchAuthorArticles', async (id) => {
  const { data } = await axios.get(`/authorarticles/${id}`);
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
  },
  filter: {
    sort: 'createdAt',
    search: ''
  }
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.filter.sort = action.payload;
    },
    setSearch: (state, action) => {
      state.filter.search = action.payload;
    }
  },
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
    },
    //getting author articles
    [fetchAuthorArticles.pending]: (state) => {
      state.articles.items = [];
      state.articles.status = 'loading';
    },
    [fetchAuthorArticles.fulfilled]: (state, action) => {
      state.articles.items = action.payload;
      state.articles.status = 'loaded';
    },
    [fetchAuthorArticles.rejected]: (state) => {
      state.articles.items = [];
      state.articles.status = 'error';
    }
  }
});

export const { setSort, setSearch } = articlesSlice.actions;

export default articlesSlice.reducer;
