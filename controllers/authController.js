import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

export const register = async (req, res) => {
  // So only the user with the first account will be the admin, so if a document/s /account/s already exists,
  // there role will be user
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  res.send('login');
};
