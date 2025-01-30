import Job from '../models/JobModel.js';

import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  // express-async-errors => We using this package - Express.js middleware that helps handle errors that occur within
  // asynchronous functions. It catches unhandled errors inside async/await functions and forwards them to Express.js's error
  // handling middleware, preventing the Node.js process from crashing. It simplifies error handling in Express.js applications
  // by allowing you to write asynchronous code without worrying about manually catching and forwarding errors.
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  console.log(job);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
};

// EDIT JOB
export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }

  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  // So we define our company and position in the job that we finded in our DB to be the company and the position
  // that coming from our req.body
  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'job modified', job });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  // So we kepping all the jobs with id that doesn't match to our id from req.params, and filtering out our job with the id
  // that do match to our id that coming from req.params
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: 'job deleted' });
};
