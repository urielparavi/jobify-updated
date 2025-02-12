import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';

export const getCurrentUser = async (req, res) => {
  // Side note: we are removing the passwrod property from the current-user end point, even the our password is hashed,
  // We don't wanna sent it back

  // We can get the user without the Password field with select method, and this actualy a better aproach
  // const user = await User.findOne({ _id: req.user.userId }).select('-password');
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  // So we make sure that if the user add the password property in the body and try to update his password,
  // we deleting it, and then we will give him his body object without his password, so we filtering it
  // therefore it will update in DB from the get go, and also he will get his object without his password
  delete obj.password;
  // console.log(obj);
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
