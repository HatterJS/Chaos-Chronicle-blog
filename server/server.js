import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { registration, authorization, authVerification } from './controllers/UserController.js';
import {
  getAllArticles,
  getArticle,
  postArticle,
  deleteArticle,
  patchArticle,
  getPopularTags
} from './controllers/ArticleController.js';

import {
  registrationValidation,
  authorizationValidation,
  articleValidation
} from './validations.js';
import checkAuthorization from './utils/checkAuthorization.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

//connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/photo_blog')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error:', err));

//connect express
const app = express();
//connect json
app.use(express.json());
//connect cors
app.use(cors());

//storage setting for images
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'server/uploads');
  },
  filename: (req, file, cb) => {
    const { id } = req.query;
    const fileName = `${id}_${file.originalname}`;
    cb(null, fileName);
  }
});
const upload = multer({ storage });
app.use('/uploads', express.static('server/uploads'));

//registration
app.post(
  '/authorization/registration',
  registrationValidation,
  handleValidationErrors,
  registration
);
//authorization
app.post(
  '/authorization/authorization',
  authorizationValidation,
  handleValidationErrors,
  authorization
);
//authorization verefication by token
app.get('/authorization/verification', checkAuthorization, authVerification);

//upload image
app.post('/upload', checkAuthorization, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`
  });
});

//get all articles
app.get('/articles', getAllArticles);
//get an article
app.get('/article/:id', getArticle);
//post an article
app.post('/article', checkAuthorization, articleValidation, handleValidationErrors, postArticle);
//delete an article
app.delete('/article/:id', checkAuthorization, deleteArticle);
//update an article
app.patch(
  '/article/:id',
  checkAuthorization,
  articleValidation,
  handleValidationErrors,
  patchArticle
);
//get popular tags
app.get('/tags', getPopularTags);

//server port
app.listen(9999, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server started');
});
