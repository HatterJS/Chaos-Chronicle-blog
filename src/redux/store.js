import { configureStore } from "@reduxjs/toolkit";

import articles from "./slices/articles.js";
import authorization from "./slices/authorization.js";
import comments from "./slices/comments.js";
import authors from "./slices/authors.js";

const store = configureStore({
  reducer: {
    articles,
    authorization,
    comments,
    authors,
  },
});

export default store;
