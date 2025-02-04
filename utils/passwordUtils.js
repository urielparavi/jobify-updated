import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  // genSalt() => creates a random value that going to be added to the password before hashing and the number is the strength
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// password => the password from req.body. hashedPassword => the password from the DB
export const comparePassword = async (password, hashedPassword) => {
  // We compare the encrypted versions
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
