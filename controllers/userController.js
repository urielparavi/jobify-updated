import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

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
  // console.log(req.file); // for image

  const newUser = { ...req.body };
  // So we make sure that if the user add the password property in the body and try to update his password,
  // we deleting it, and then we will give him his body object without his password, so we filtering it
  // therefore it will update in DB from the get go, and also he will get his object without his password
  delete newUser.password;
  // console.log(obj);

  // So we only want to upload the image if the user sending it, because we can update the user without updating the image
  if (req.file) {
    // upload => method of cloudinary.
    // req.file.path = public\uploads\7e15a85d10bcb7d6cd85927cfe19f3ee.jpg
    // So we uploading the image to cloudinary from our file system
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    // console.log(response);
    // So if succeeded upload the image to cloudinary, we remove that image right away from our file system
    await fs.unlink(req.file.path);
    // secure_url => Property from our response object that contain The link that point the image, so the image URL
    newUser.avatar = response.secure_url;
    // public_id => Property from our response object that that one of the main identifiers for an asset in our account
    newUser.avatarPublicId = response.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  // So if the user sending the image, i.e the file exist, we also wanna check if whether there is an old image in
  // cloudinary since we returning the old instance of the user (updated user). so, if there's a new file and if
  // there's an old one in the cloudinary, it's mean that public_id exist already, because when the user sending image
  // on the first time, it will not exist. so if it exist, then we wanna proceed and remove it, and this way
  // they will not charge money from us for storing images
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
