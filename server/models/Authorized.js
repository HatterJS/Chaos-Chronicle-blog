import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    avatarUrl: String,
    status: {
      type: String,
      required: true,
      default: 'Читач'
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    userArticles: {
      type: Number,
      required: true,
      default: 0
    },
    userComments: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Authorized', UserSchema);
