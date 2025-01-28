import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';

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

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on PORT ${port}...`);
});
