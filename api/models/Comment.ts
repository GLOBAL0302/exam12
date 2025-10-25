import mongoose from 'mongoose';
import { User } from './User';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: [true, 'comment is required'],
  },
  user: {
    type: mongoose.Types.ObjectId,
    Ref: 'user',
    required: [true, 'Comment required User'],
    validate: [
      {
        validator: async (value: mongoose.Types.ObjectId) => {
          const user = await User.findById(value);
          return Boolean(user);
        },
        message: 'User Id is required for Cocktail',
      },
    ],
  },
});

export const Comment = mongoose.model('comment', commentSchema);
