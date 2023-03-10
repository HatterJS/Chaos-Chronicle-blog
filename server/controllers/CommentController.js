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
    const doc = new CommentModel({
      articleId,
      text,
      author: req.userId
    });
    const comment = await doc.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось додати коментар' });
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
