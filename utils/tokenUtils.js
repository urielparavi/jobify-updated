import jwt from 'jsonwebtoken';

export const createJWT = (payload) => {
  const token = jwt.sign(payload, 'ourSecretKey', {
    expiresIn: '1d',
  });
  return token;
};
