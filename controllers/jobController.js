import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  // console.log(req.user); // => { userId: '67a310c7ef650f7eb42c7d9b', role: 'admin' }
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  // express-async-errors => We using this package - Express.js middleware that helps handle errors that occur within
  // asynchronous functions. It catches unhandled errors inside async/await functions and forwards them to Express.js's error
  // handling middleware, preventing the Node.js process from crashing. It simplifies error handling in Express.js applications
  // by allowing you to write asynchronous code without worrying about manually catching and forwarding errors.

  // Since the Job Model looking for createdBy property, we can attaching it and set it to the userId that we have
  // from our user property from our req.user
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

// EDIT JOB
export const updateJob = async (req, res) => {
  const updatedJob = await Job.findOneAndUpdate(req.params.id, req.body, {
    // To get the new update job and not the old one
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: 'job deleted', job: removedJob });
};
