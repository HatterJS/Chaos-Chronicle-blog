import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/Authorized.js';

//registration
export const registration = async (req, res) => {
  try {
    const findUser = await UserModel.findOne({ email: req.body.email });
    if (findUser) {
      return res.status(404).json({ message: 'Користувач з таким email вже зареєстрований' });
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
};
//authorization
export const authorization = async (req, res) => {
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
};
//authorization verefication by token
export const authVerification = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      res.status(403).json({ message: 'Доступ відсутній' });
    } else {
      const { passwordHash, ...userData } = user._doc;
      res.json(userData);
    }
  } catch (err) {
    res.status(500).json('Авторизація пройшла не коректно');
  }
};
//change user data
export const patchUserData = async (req, res) => {
  try {
    const { userId } = req;
    const { avatarUrl, fullName, email, password, currentPassword } = req.body;

    const user = await UserModel.findById(userId);

    const isValidPassword = await bcrypt.compare(currentPassword, user._doc.passwordHash);
    if (!isValidPassword) {
      return res.status(404).json({ message: 'Не вірний пароль' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await UserModel.findByIdAndUpdate(userId, {
      avatarUrl,
      fullName,
      email,
      passwordHash
    });
    res.json({ message: 'Дані користувача оновлено успішно' });
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось змінити дані' });
  }
};
//user promotion
export const promoteUser = async (req, res) => {
  try {
    const { userId, status } = req.body;
    await UserModel.findByIdAndUpdate(userId, { status });
    res.json({ message: 'Статус користувача змінено успішно' });
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось змінити статус користувача' });
  }
};
//get authors by rating
export const getAuthors = async (req, res) => {
  try {
    const authors = await UserModel.find({ rating: { $gt: 0 } }).sort({ rating: -1 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось знайти авторів' });
  }
};
