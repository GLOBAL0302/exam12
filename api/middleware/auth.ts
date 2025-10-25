import { Request, Response, NextFunction } from 'express';
import { IUserFields } from '../types';
import { error } from 'console';
import { User } from '../models/User';

export interface IReqWithUser extends Request {
  user: IUserFields;
}

export const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as IReqWithUser;
  const token = req.get('Authorization');

  if (!token) {
    res.status(400).send({ error: 'Token is not provided' });
    return;
  }

  const user = await User.findOne({ token });
  if (!user) {
    res.status(400).send({ error: 'User with such token not found' });
    return;
  }

  req.user = user;
  next();
};
