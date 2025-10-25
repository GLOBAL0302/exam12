import express from 'express';
import { Error } from 'mongoose';
import { auth } from '../middleware/auth';
import { upload } from '../middleware/multer';
import { Meal } from '../models/Meal';

const mealsRouter = express.Router();

mealsRouter.get('/', async (req, res, next) => {
  try {
  } catch (e) {
    console.log(e);
    next(e);
  }
});

mealsRouter.post('/', auth, upload.single('image'), async (req, res, next) => {
  try {
    const newMeal = {
      title: req.body.title,
      recipe: req.body.recipe,
      image: req.file ? 'images' + req.file.filename : null,
    };

    const meal = new Meal(newMeal);
    await meal.save();
    res.status(200).send(meal);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send(e);
    }
    next(e);
  }
});

export default mealsRouter;
