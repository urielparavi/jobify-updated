import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword } from '../utils/passwordUtils.js';

export const register = async (req, res) => {
  // So only the user with the first account/document will be the admin, so if a document/s /account/s already exists,
  // there role will be user
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  // So essentially we overriding req.body.password - first we grab the req.body.password to get the hashed version
  // and then it's going to be the hashed password
  req.body.password = hashedPassword; // test1234 => $2a$10$kgz1zrmt43JS04nmEP7EZuJyWgrid9gcrCg/NQfP5UasCT

  // Since we pass the entire req.body to our Model and created it, we don't need to use the user to create one in the DB
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

export const login = async (req, res) => {
  res.send('login');
};
