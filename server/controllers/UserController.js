import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/Authorized.js";
import ArticleModel from "../models/Articles.js";
import CommentModel from "../models/Comments.js";

import { sendMail } from "../sendMail.js";

//registration
export const registration = async (req, res) => {
  try {
    const findUser = await UserModel.findOne({ email: req.body.email });
    if (findUser) {
      return res
        .status(404)
        .json({ message: "Користувач з таким email вже зареєстрований" });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "blog_secret_key",
      {
        expiresIn: "30d",
      }
    );

    sendMail(req, token);

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Реєстрація пройшла не коректно" });
  }
};
//authorization
export const authorization = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Користувача з таким email або паролем не існує" });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPassword) {
      return res
        .status(404)
        .json({ message: "Користувача з таким email або паролем не існує" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "blog_secret_key",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    res.status(500).json("Авторизація пройшла не коректно");
  }
};
//authorization verefication by token
export const authVerification = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      res.status(403).json({ message: "Доступ відсутній" });
    } else {
      const { passwordHash, ...userData } = user._doc;
      res.json(userData);
    }
  } catch (err) {
    res.status(500).json("Авторизація пройшла не коректно");
  }
};
//confirm email by token
export const confirmEmail = async (req, res) => {
  const { userId } = req;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(403).json({
        message:
          "Термін підтвердження E-mail минув. Пройдіть повторно процедуру реєстрації.",
      });
    }
    const userData = await UserModel.findByIdAndUpdate(
      userId,
      { emailConfirmed: true },
      { new: true }
    );
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "blog_secret_key",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      ...userData._doc,
      token,
      message: "Вітаємо! Підтвердження E-mail пройшло успішно.",
    });
  } catch (err) {
    res.status(500).json({ message: "Не вдалось підтвердити Email" });
  }
};
//change user data
export const patchUserData = async (req, res) => {
  try {
    const { userId } = req;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(req.body.password, salt);

      const user = await UserModel.findByIdAndUpdate(
        userId,
        { passwordHash },
        { new: true }
      );
      return res.json({
        ...user._doc,
        message: "Пароль користувача оновлено успішно",
      });
    }

    const user = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.json({ ...user._doc, message: "Дані користувача оновлено успішно" });
  } catch (err) {
    res.status(500).json({ message: "Не вдалось змінити дані" });
  }
};
//delete user
export const deleteAccount = async (req, res) => {
  const { userId } = req;
  try {
    await ArticleModel.updateMany(
      { author: userId },
      { $set: { author: "64312578ca9334f5a1aa6226" } }
    );
    await CommentModel.updateMany(
      { author: userId },
      { $set: { author: "64312578ca9334f5a1aa6226" } }
    );
    await UserModel.findByIdAndDelete(userId);
    res.json({
      message: `Обліковий запис видалено успішно.`,
    });
  } catch (err) {
    res.status(500).json({ message: "Не вдалось видалити обліковий запис." });
  }
};
//user promotion
export const promoteUser = async (req, res) => {
  try {
    const { userId, status } = req.body;
    await UserModel.findByIdAndUpdate(userId, { status });
    res.json({ message: "Статус користувача змінено успішно", status });
  } catch (err) {
    res.status(500).json({ message: "Не вдалось змінити статус користувача" });
  }
};
//get authors by rating
export const getAuthors = async (req, res) => {
  try {
    const authors = await UserModel.find({ rating: { $gt: 0 } }).sort({
      rating: -1,
    });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: "Не вдалось знайти авторів" });
  }
};
