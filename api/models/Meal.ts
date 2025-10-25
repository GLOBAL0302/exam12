import mongoose from 'mongoose';
import { User } from './User';

const Schema = mongoose.Schema;

const mealSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Meal required title'],
    trim: true,
  },
  recipe: {
    type: String,
    required: [true, 'Meal required recipe'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Meal required Image'],
    trim: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user', // should be lowercase 'ref', not 'Ref'
    required: [true, 'meal required User'],
    validate: [
      {
        validator: async (value: mongoose.Types.ObjectId) => {
          const user = await User.findById(value);
          return Boolean(user);
        },
        message: 'User Id is required for Meal',
      },
    ],
  },
});

export const Meal = mongoose.model('meal', mealSchema);
