import jwt from 'jsonwebtoken';

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// So the token consists from 3 parts - header, payload and the secret, and every token has unique signature
// from these 3 parts. So if hacker takes our token, he will not have our secret. He can see our payload and
// our header, but not our secret. Meaning, that his signature will be different from us, so his current signature
// will be different from our old signature therefore when he will try to do request, he will fail in the verifying process
export const verifyJWT = (token) => {
  // We verify the token and the secret and decoded the payload. in this case, we will get the userId and the role
  // after that we check the secret, because we wanna make sure that is the original secret, so if it's wrong secret,
  // we will come to cath error and get the 'authentication invalid' message
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
