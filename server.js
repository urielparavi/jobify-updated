import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

const app = express();

// The process object is a global that provides information about, and control over, the current Node. js process. As a
// global, it is always available to Node. js applications without using require() and inside of him we have
// the env object that has different environment variables and we can also sets new ones there, so with dotenv we could
// store our environment variables in .env file, and it will save it in the env object
// console.log(process.env);
if (process.env.NODE_ENV === 'development') {
  // Give us informatin/logs about the request, super useful when connect backend to frontend
  app.use(morgan('dev'));
}

// Because our data from the frontend come as a json data, so to accept it, we need a Body parser to reading data
// from body into req.body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/', (req, res) => {
  // console.log(req);
  res.json({ message: 'data received', data: req.body });
});

// GET ALL JOBS
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

// CREATE JOB
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }
  const id = nanoid(10); // The number represent how big the number will be
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
});

// GET SINGLE JOB
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
});

// EDIT JOB
app.patch('/api/v1/jobs/:id', (req, res) => {
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
});

// DELETE JOB
app.delete('/api/v1/jobs/:id', (req, res) => {
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
});

// NOT FOUND REQUEST MIDDLEWARE
// app.use => for all the http methods, * for all the URLs
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on PORT ${port}...`);
});
