import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';

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
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateTest = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 characters long')
    .trim(),
]);
