import { configureStore } from '@reduxjs/toolkit';

import articles from './slices/articles.js';
import authorization from './slices/authorization.js';
import comments from './slices/comments.js';

const store = configureStore({
  reducer: {
    articles,
    authorization,
    comments
  }
});

export default store;
