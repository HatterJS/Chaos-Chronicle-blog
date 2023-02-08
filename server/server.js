import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registrationValidation } from './validation/authorization.js';
import UserModel from './models/Authorized.js';

mongoose
  .connect('mongodb://127.0.0.1:27017/photo_blog')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error:', err));

const app = express();

app.use(express.json());

app.post('/authorization/registration', registrationValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      passwordHash,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl
    });

    const user = await doc.save();

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Реєстрація пройшла не коректно' });
  }
});

app.listen(9999, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server started');
});
