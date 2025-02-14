import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/JobModel.js';
import User from './models/UserModel.js';

/* We programmatically populating our database with a bunch of job instances */

try {
  await mongoose.connect(process.env.MONGO_URL);
  // const user = await User.findOne({ email: 'test@example.com' });
  const user = await User.findOne({ email: 'admin@example.com' });
  // We reading and parse our json jobs to JS object because we wanna loop over them
  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  // console.log(jsonJobs);
  // So we iterate on every job from our jobs array and returning the whole object + createdBy property with the user id -
  // one time of the test user, and one time for the admin
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  // We delete all data with that id from collection first, to start from scratch
  await Job.deleteMany({ createdBy: user._id });
  // And now we inject these jobs
  await Job.create(jobs);
  console.log('Succes!!!');
  // Whereas Exit code 0 is used to terminate when no more async operations are happening. So since we are done and
  // there is no more operations, we exit zero
  process.exit(0);
} catch (error) {
  console.log(error);
  // Exit code 1 is used when unhandled fatal exceptions occur that were not handled.
  process.exit(1);
}
