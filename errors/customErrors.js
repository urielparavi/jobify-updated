import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends Error {
  constructor(message) {
    // keyword that used in classes to call constructor or access the properties and methods of a parent (superclass),
    // so this referred to this.object, and super referred to the parent, so we inherits the message property
    // from his parent the Error class, and for get the properties/methods from the parent class,  we need to use super
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
