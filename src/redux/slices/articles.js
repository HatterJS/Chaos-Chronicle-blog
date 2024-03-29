import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

//async request to the backend to getting all articles
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params) => {
    const { data } = await axios.get(`/articles`, { params });
    return data;
  }
);
//async request to the backend to getting popular tags
export const fetchTags = createAsyncThunk("articles/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});
//async request to the backend to getting author articles
export const fetchAuthorArticles = createAsyncThunk(
  "/articles/fetchAuthorArticles",
  async (params) => {
    const { data } = await axios.get(`/authorarticles/${params.id}`, {
      params,
    });
    return data;
  }
);

const initialState = {
  articles: {
    items: [],
    status: "loading",
    pagination: {
      totalPages: null,
      page: 1,
      perPage: 7,
    },
  },
  tags: {
    items: [],
    status: "loading",
  },
  filter: {
    sort: "createdAt",
    search: "",
  },
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.filter.sort = action.payload;
    },
    setSearch: (state, action) => {
      state.filter.search = action.payload;
    },
    switchPage: (state, action) => {
      state.articles.pagination.page = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchArticles.pending, (state) => {
        state.articles.items = [];
        state.articles.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles.items = action.payload.articles;
        state.articles.pagination.totalPages = action.payload.totalPages;
        state.articles.status = "loaded";
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.articles.items = [];
        state.articles.status = "error";
      })
      .addCase(fetchTags.pending, (state) => {
        state.tags.items = [];
        state.tags.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = "loaded";
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = "error";
      })
      .addCase(fetchAuthorArticles.pending, (state) => {
        state.articles.items = [];
        state.articles.status = "loading";
      })
      .addCase(fetchAuthorArticles.fulfilled, (state, action) => {
        state.articles.items = action.payload.myArticles;
        state.articles.pagination.totalPages = action.payload.totalPages;
        state.articles.status = "loaded";
      })
      .addCase(fetchAuthorArticles.rejected, (state) => {
        state.articles.items = [];
        state.articles.status = "error";
      });
  },
});

export const { setSort, setSearch, switchPage } = articlesSlice.actions;

export default articlesSlice.reducer;
