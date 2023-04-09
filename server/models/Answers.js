import mongoose from 'mongoose';

const AnswersSchema = mongoose.Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Authorized',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Answers', AnswersSchema);
