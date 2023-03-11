import CommentModel from '../models/Comments.js';

export const getComments = async (req, res) => {
  try {
    const articleId = req.params.id;
    const comments = await CommentModel.find({ articleId })
      .populate('author')
      .sort({ createdAt: -1 })
      .exec();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось завантажити коментарі до статті' });
  }
};

export const postComment = async (req, res) => {
  try {
    const { articleId, text } = req.body;
    const allComments = await CommentModel.find({ articleId });
    const authors = allComments.map((item) => String(item.author));
    if (authors.includes(req.userId)) {
      return res.status(403).json({ message: 'Ви вже додавали коментар до цієї статті' });
    }
    const doc = new CommentModel({
      articleId,
      text,
      author: req.userId
    });
    const comment = await doc.save();
    const commentWithAuthor = await CommentModel.findById(comment._id).populate('author').exec();
    res.json(commentWithAuthor);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось додати коментар' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { author } = await CommentModel.findById(commentId);
    if (String(author) !== req.userId) {
      return res.status(403).json({ message: 'Доступ відсутній' });
    }
    CommentModel.findByIdAndDelete(commentId, (err, doc) => {
      if (err) {
        return res.status(500).json({ message: 'Не вдалось видалити статтю' });
      }
      if (!doc) {
        return res.status(404).json({ message: 'Не вдалось знайти статтю' });
      }
      res.json({ message: 'Коментар видалено успішно' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось видалити коментар' });
  }
};

export const likeComment = async (req, res) => {
  const commentId = req.params.id;
  const { userId } = req;
  try {
    const { usersLiked } = await CommentModel.findById(commentId);
    if (usersLiked.includes(userId)) {
      const comment = await CommentModel.findByIdAndUpdate(
        commentId,
        {
          $pull: { usersLiked: userId }
        },
        { returnDocument: 'after' }
      );
      res.json(comment.usersLiked);
    } else {
      const comment = await CommentModel.findByIdAndUpdate(
        commentId,
        { $addToSet: { usersLiked: userId } },
        { returnDocument: 'after' }
      );
      res.json(comment.usersLiked);
    }
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось лайкнути коментар' });
  }
};
