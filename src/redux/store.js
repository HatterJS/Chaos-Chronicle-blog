import { configureStore } from '@reduxjs/toolkit';

import articles from './slices/articles.js';
import authorization from './slices/authorization.js';

const store = configureStore({
  reducer: {
    articles,
    authorization
  }
});

export default store;
