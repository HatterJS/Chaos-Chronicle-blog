import express from 'express';
import mongoose from 'mongoose';

import { registration, authorization, authVerification } from './controllers/UserController.js';
import { getAllArticles, getArticle, postArticle } from './controllers/ArticleController.js';

import {
  registrationValidation,
  authorizationValidation,
  articleValidation
} from './validations.js';
import checkAuthorization from './utils/checkAuthorization.js';

//connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/photo_blog')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error:', err));

//connect express
const app = express();
//connect json
app.use(express.json());

//registration
app.post('/authorization/registration', registrationValidation, registration);
//authorization
app.post('/authorization/authorization', authorizationValidation, authorization);
//authorization verefication by token
app.get('/authorization/verification', checkAuthorization, authVerification);

//get all articles
app.get('/article', getAllArticles);
//get an article
app.get('/article/:id', articleValidation, getArticle);
//post an article
app.post('/article', checkAuthorization, articleValidation, postArticle);
//delete an article
// app.delete('/article', articleValidation, deleteArticle);
//update an article
// app.patch('/article', articleValidation, patchArticle);

//server port
app.listen(9999, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server started');
});
