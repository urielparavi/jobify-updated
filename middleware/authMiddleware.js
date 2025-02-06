import { UnauthenticatedError } from '../errors/customErrors.js';
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
