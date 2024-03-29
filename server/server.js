import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import fs from 'fs';
import path from 'path';

import {
  registration,
  authorization,
  authVerification,
  patchUserData,
  getAuthors,
  promoteUser,
  confirmEmail,
  deleteAccount,
  passwordRecovery,
} from './controllers/UserController.js';
import {
  getAllArticles,
  getArticle,
  postArticle,
  deleteArticle,
  patchArticle,
  getPopularTags,
  getMyArticles,
  articleReminder,
} from './controllers/ArticleController.js';
import {
  deleteComment,
  getComments,
  getLastComments,
  getMyComments,
  likeComment,
  postComment,
} from './controllers/CommentController.js';
import {
  deleteAnswer,
  getAnswers,
  postAnswer,
} from './controllers/AnswerController.js';

import {
  registrationValidation,
  authorizationValidation,
  articleValidation,
} from './validations.js';
import checkAuthorization from './utils/checkAuthorization.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

//connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/CCBlog')
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
  destination: (req, __, cb) => {
    cb(null, `uploads/${req.query.dir}/`);
  },
  filename: (__, file, cb) => {
    const originalName = file.originalname;
    const extention = originalName.split('.').pop();
    const unicName = `${Date.now()}-${originalName.split('.')[0]}.${extention}`;
    cb(null, unicName);
  },
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads/'));

//upload image
app.post(
  '/upload',
  // checkAuthorization,
  upload.single('image'),
  (req, res) => {
    res.json({
      url: `uploads/${req.query.dir}/${req.file.filename}`,
    });
  }
);
//delete image
app.delete('/delete/:filename', (req, res) => {
  const filePath = path.join(`uploads/${req.query.dir}/${req.params.filename}`);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'Error deleting file',
      });
    } else {
      res.json({
        message: 'File deleted successfully',
      });
    }
  });
});

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
//authorization by token
app.get('/authorization/verification', checkAuthorization, authVerification);
//Email confirmation
app.get('/confirmemail', checkAuthorization, confirmEmail);
//change user data
app.patch(
  '/authorization/changeData',
  // registrationValidation,
  // handleValidationErrors,
  checkAuthorization,
  patchUserData
);
//delete user
app.delete('/authorization/delete', checkAuthorization, deleteAccount);
//password recovery
app.get('/authorization/recovery', passwordRecovery);
//user promotion
app.patch('/promotion', checkAuthorization, promoteUser);
//get all authors
app.get('/authors', getAuthors);

//get all articles
app.get('/articles', getAllArticles);
//get my articles
app.get('/myarticles', checkAuthorization, getMyArticles);
//get author articles
app.get('/authorarticles/:id', getMyArticles);
//get an article
app.get('/article/:id', getArticle);
//post an article
app.post(
  '/article',
  checkAuthorization,
  articleValidation,
  handleValidationErrors,
  postArticle
);
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
//remind subscribers about the article
app.get('/article/remind/:id', checkAuthorization, articleReminder);

//get popular tags
app.get('/tags', getPopularTags);

//get last comments
app.get('/lastcomments', getLastComments);
//get comments
app.get('/comments/:id', checkAuthorization, getComments);
//get user comments
app.get('/mycomments', checkAuthorization, getMyComments);
//post comment
app.post('/comment', checkAuthorization, postComment);
//like comment
app.get('/likecomment/:id', checkAuthorization, likeComment);
//delete comment
app.delete('/comment/:id', checkAuthorization, deleteComment);

//get answers
app.get('/answers/:id', getAnswers);
//post answer
app.post('/answer', checkAuthorization, postAnswer);
// delete answer
app.delete('/answer/:id', checkAuthorization, deleteAnswer);

//server port
app.listen(9999, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server started');
});
