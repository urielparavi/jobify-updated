import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

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
  // So only if we find the email of the user in our DB, the user will be exist/true
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    // user.password => Since only if user will be true we will continue to compare his password,
    // so at this point we know his password will exist in our user
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    // An HTTP-only cookie is a cookie that can't be accessed by JavaScript running in the browser. It is designed to help
    // prevent cross-site scripting (XSS) attacks, which can be used to steal cookies and other sensitive information.
    httpOnly: true,
    // We need to provide this time in milliseconds
    expires: new Date(Date.now() + oneDay),
    // secure: true => Meaning that the cookie can be only transmitted over HTTPS protocol
    // Since we developing, we set the secure property to true only in production, so that in development we will
    // still can transmit the cookie in HTTP protocol
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};
