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
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id
      },
      'blog_secret_key',
      {
        expiresIn: '30d'
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Реєстрація пройшла не коректно' });
  }
});

app.post('/authorization/authorization', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'Користувача з таким email або паролем не існує' });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPassword) {
      return res.status(404).json({ message: 'Користувача з таким email або паролем не існує' });
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      'blog_secret_key',
      {
        expiresIn: '30d'
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    res.status(500).json('Авторизація пройшла не коректно');
  }
});

app.listen(9999, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server started');
});
