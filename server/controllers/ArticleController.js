import { validationResult } from 'express-validator';
import ArticleModel from '../models/Articles.js';

export const postArticle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    }

    const doc = new ArticleModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      author: req.userId
    });

    const article = await doc.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Розміщення статті пройшло не коректно' });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const allArticles = await ArticleModel.find();
    res.json(allArticles);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось знайти статті' });
  }
};
