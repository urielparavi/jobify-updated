import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  // express-async-errors => We using this package - Express.js middleware that helps handle errors that occur within
  // asynchronous functions. It catches unhandled errors inside async/await functions and forwards them to Express.js's error
  // handling middleware, preventing the Node.js process from crashing. It simplifies error handling in Express.js applications
  // by allowing you to write asynchronous code without worrying about manually catching and forwarding errors.
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  // throw new NotFoundError() => This instance of the NotFoundError that extends the built-in Error class and inherits
  //  his properties and methods, and it will be triggere our errorHandeler middleware - so if wer'e passing
  // the message and the statusCode successfully it will be them, otherwise it be our default generic message, statusCode
  // so, the 500 statusCode, and "somthing went wrong..."
  if (!job) throw new NotFoundError(`no job with id ${id}`);
  res.status(StatusCodes.OK).json({ job });
};

// EDIT JOB
export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findOneAndUpdate(id, req.body, {
    // To get the new update job and not the old one
    new: true,
  });

  if (!updatedJob) throw new NotFoundError(`no job with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const removedJob = await Job.findByIdAndDelete(id);
  // console.log(removedJob);

  if (!removedJob) throw new NotFoundError(`no job with id ${id}`);

  res.status(200).json({ msg: 'job deleted', job: removedJob });
};
