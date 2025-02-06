import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  // console.log(req.cookies);
  if (!token) throw new UnauthenticatedError('authentication invalid');

  try {
    const { userId, role } = verifyJWT(token);
    // console.log(user); // => { userId: '67a310c7ef650f7eb42c7d9b', role: 'admin',iat: 1738741993, exp: 1738828393 }
    // We create new property user on the request object and it will be also an object with userId and the role
    // that we can pass to the next controller/s , so our controllers of the same our protected routes
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

// rest parameters => (...rest) allow a function work with a variable number of arguments by bundling them into an array

// spread => expends an array into seperate elements
// rest => bundles seperate elements into an array
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    // So we check whether req.user.role is in the roles array. So in our case we looking for the admin, and
    // if it has user role, he will get an error
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    // console.log(roles); => [ 'admin' ]
    next();
  };
};
