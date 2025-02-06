import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// Instance methods - we get here the instance of the user. So we get back our user from any instance that we do in any
// contrller, so when we get the user for example by find method in some controller, we do instace of it

//  toJSON => our name that we select
UserSchema.methods.toJSON = function () {
  // toObject => We transform our user to JS object, so we returns an object with each property name and value corresponding
  // obj => Our object User Model
  let obj = this.toObject();
  // We remove the password property, so that we cannot se it in the current-user end point
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);
