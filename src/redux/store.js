import { configureStore } from '@reduxjs/toolkit';

import articles from './slices/articles.js';
import authorization from './slices/authorization.js';
import comments from './slices/comments.js';
import authors from './slices/authors.js';
import answers from './slices/answers.js';

const store = configureStore({
  reducer: {
    articles,
    authorization,
    comments,
    authors,
    answers,
  },
});

export default store;
