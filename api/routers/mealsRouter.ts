import express from 'express';
import { Error } from 'mongoose';
import { auth, IReqWithUser } from '../middleware/auth';
import { upload } from '../middleware/multer';
import { Meal } from '../models/Meal';
const mealsRouter = express.Router();

mealsRouter.get('/', async (req, res, next) => {
  const { userId } = req.query;
  let filter = userId ? { user: userId } : {};
  try {
    const meals = await Meal.find(filter).populate('user', '-token');
    res.status(200).send(meals);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

mealsRouter.post('/', auth, upload.single('image'), async (req, res, next) => {
  try {
    const user = (req as IReqWithUser).user;
    const newMeal = {
      user,
      title: req.body.title,
      recipe: req.body.recipe,
      image: req.file ? 'images' + req.file.filename : null,
    };
    const meal = new Meal(newMeal);
    await meal.save();
    res.status(200).send({ message: 'Meal has been added' });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send(e);
    }
    next(e);
  }
});

mealsRouter.delete('/:mealId', async (req, res, next) => {
  const { mealId } = req.params;
  try {
    await Meal.findByIdAndDelete({ _id: mealId });
    res.status(200).send({ message: 'Meal is deleted' });
  } catch (e) {
    console.log(e);
  }
});

export default mealsRouter;
