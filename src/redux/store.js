import { configureStore } from '@reduxjs/toolkit';

import articles from './slices/articles.js';

const store = configureStore({
  reducer: {
    articles
  }
});

export default store;
