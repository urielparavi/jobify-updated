import { body, validationResult, param } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
  // In express if we have multiple middleware, we grouping them together by set up an array, so it's not express validator
  // syntax
  return [
    // Here in this parameter/argument we set up our roles for the fields that we want to validate
    validateValues,
    // Here check for errors if they exist, and if that is the case we'll send back 404 of whatever error we want to sent back
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        // If we get here, we will looking to first item, since in that case they're not going to be multiple messages,
        // there's only going to be one
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('job location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('invalid type value'),
]);

export const validateIdParam = withValidationErrors([
  param('id')
    // So if it's a true, that mean that our id is with pattern of ObjectId/mongoDBId, and if it's not, that mean that the id
    // is not with pattern of ObjectId/mongoDBId. So if it's mongoDBId it will pass to the next middleware to the controller,
    // but still the mongoDBId could fail in the controller if the mongoDBId is not found, and then we throw the NotFoundError()
    // value => the value from the function will be the actual id from the param('id)
    .custom(async (value) => {
      const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
      // We also can use the class Error that built in JS because the actualy class will be from errorMessages in the
      // second middleware, and is also applies to our NotFoundError class down
      if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
      const job = await Job.findById(value);

      // throw new NotFoundError() => This instance of the NotFoundError that extends the built-in Error class and inherits
      //  his properties and methods, and it will be triggere our errorHandeler middleware - so if wer'e passing
      // the message and the statusCode successfully it will be them, otherwise it be our default generic message, statusCode
      // so, the 500 statusCode, and "somthing went wrong..."
      if (!job) throw new NotFoundError(`no job with id ${value}`);
    }),
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    // value => the value from the function will be the actual email from the body('email')
    .custom(async (email) => {
      // So we search the email that come from our body in DB
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
]);
