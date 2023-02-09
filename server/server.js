import express from 'express';
import mongoose from 'mongoose';

import { registration, authorization, authVerification } from './controllers/UserAuthorization.js';

import { registrationValidation } from './validation/authorization.js';
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
app.post('/authorization/authorization', authorization);
//authorization verefication by token
app.get('/authorization/verification', checkAuthorization, authVerification);

//server port
app.listen(9999, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server started');
});
