import express from 'express';

import { Error } from 'mongoose';
import { auth } from '../middleware/auth';
import { Comment } from '../models/Comment';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  const { mealId } = req.query;

  try {
    const comments = await Comment.find({ meal: mealId }).populate('user', 'displayName avatar');
    res.status(200).send(comments.reverse());
  } catch (e) {
    console.log(e);
  }
});

commentsRouter.post('/', auth, async (req, res, next) => {
  try {
    const newComment = {
      user: req.body.user,
      meal: req.body.meal,
      comment: req.body.comment,
    };
    const comment = new Comment(newComment);
    await comment.save();
    res.status(200).send({ message: 'comment Added' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
  }
});

commentsRouter.delete('/:commentId', auth, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndDelete({ _id: commentId });
    res.status(200).send({ message: 'comment Deleted' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

export default commentsRouter;
