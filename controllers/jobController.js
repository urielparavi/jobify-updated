import Job from '../models/JobModel.js';

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
  const { id } = req.params;

  const updatedJob = await Job.findOneAndUpdate(id, req.body, {
    // To get the new update job and not the old one
    new: true,
  });

  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(200).json({ msg: 'job modified', job: updatedJob });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const removedJob = await Job.findByIdAndDelete(id);
  // console.log(removedJob);

  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(200).json({ msg: 'job deleted', job: removedJob });
};
