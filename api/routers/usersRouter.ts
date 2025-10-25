import express from 'express';
import { Error } from 'mongoose';
import { User } from '../models/User';
import { randomUUID } from 'crypto';

import { config } from '../config';
import { upload } from '../middleware/multer';
import { auth, IReqWithUser } from '../middleware/auth';
import { OAuth2Client } from 'google-auth-library';

const usersRouter = express.Router();

const googleClient = new OAuth2Client(config.google.clientId);

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send({ error: 'Google Login error' });
    }

    const mail = payload.email;
    const id = payload.sub;
    const displayName = payload.name;
    const avatar = payload.picture;

    if (!mail) {
      return res.status(400).send({ error: 'Google Login Error' });
    }

    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = new User({
        username: mail,
        password: randomUUID(),
        googleId: id,
        displayName,
        avatar,
      });
    }
    user.generateToken();
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
});

usersRouter.post('/', upload.single('avatar'), async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? 'images' + req.file.filename : null,
    };
    const user = new User(newUser);
    user.generateToken();
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
    }
    next(error);
  }
});

usersRouter.post('/session', async (req, res, next) => {
  try {
    if (!req.body.username) {
      res.status(400).send({ error: 'Please Provide username' });
      return;
    }
    if (!req.body.password) {
      res.status(400).send({ error: 'Please Provide password' });
    }

    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      res.status(400).send({ error: 'No User Found' });
      return;
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      res.status(400).send({ error: 'Username or password is not correct' });
      return;
    }

    user.generateToken();
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
    }
    next(error);
  }
});

usersRouter.delete('/session', auth, async (req, res, next) => {
  try {
    const token = (req as IReqWithUser).user.token;
    const success = { message: 'Success logout' };
    if (!token) {
      res.send(success);
      return;
    }
    const user = await User.findOne({ token });
    if (!user) {
      res.send(success);
      return;
    }
    user.token = randomUUID();
    await user.save();
    res.status(200).send(success);
    return;
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
