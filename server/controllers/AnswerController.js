import AnswerModel from '../models/Answers.js';

export const getAnswers = async (req, res) => {
  const commentId = req.params.id;
  try {
    const answers = await AnswerModel.find({ commentId })
      .populate('author')
      .exec();
    res.json({ commentId, answers });
  } catch (err) {
    res.status(500).json({
      message: `Не вдалось отримати відповіді до коментаря ${commentId}`,
    });
  }
};

export const postAnswer = async (req, res) => {
  const { commentId, text } = req.body;
  const author = req.userId;
  try {
    const doc = new AnswerModel({
      commentId,
      text,
      author,
    });
    const answer = await doc.save();
    await AnswerModel.populate(answer, 'author');
    res.json({ commentId, answer });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось додати відповідь',
    });
  }
};

export const deleteAnswer = async (req, res) => {
  const answerId = req.params.id;
  const { userId } = req;
  try {
    const { author } = await AnswerModel.findById(answerId);
    if (String(author) !== userId) {
      return res
        .status(403)
        .json({ message: 'Ви не можете видаляти чужі відповіді' });
    }
    await AnswerModel.findByIdAndDelete(answerId);
    res.json({ message: 'Вашу відповідь видалено успішно.' });
  } catch (err) {
    res.status(500).json({ message: 'Не вдалось видалити відповідь.' });
  }
};
