import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();

// routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

// The process object is a global that provides information about, and control over, the current Node. js process. As a
// global, it is always available to Node. js applications without using require() and inside of him we have
// the env object that has different environment variables and we can also sets new ones there, so with dotenv we could
// store our environment variables in .env file, and it will save it in the env object
// console.log(process.env);
if (process.env.NODE_ENV === 'development') {
  // Give us informatin/logs about the request, super useful when connect backend to frontend
  app.use(morgan('dev'));
}

// cookie-parser is middleware that simplifies handling cookies. It parses incoming cookies from client requests and makes them
// accessible in the req.cookies object. This makes it easier to read and manipulate cookies in Express JS application
// without manual parsing.
app.use(cookieParser());

// Because our data from the frontend come as a json data, so to accept it, we need a Body parser middleware to reading data
// from body into req.body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

// NOT FOUND REQUEST MIDDLEWARE
// app.use => for all the http methods, * for all the URLs
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// ERROR MIDDLEWARE
// So this middleware for Programming or other unknown error like a typo, forgetting async, await, some bugs and so on,
// and also for operational, trusted error and in this case the throw new Error() in some controller will activate
// this middleware from our response - for example if there is no job/id, not filling a certain field and we throw new Error()
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

// Top-level-await => In our days we dont have to create function for using await, we can use it right of the gate
// with "type": "module" in package.json without function, but we still needed to wrapped it for success and fail
try {
  // This note is to remember how to create a database.
  // MONGO_URL=mongodb+srv://username:password@cluster0.d7p6t.mongodb.net/OurDBName
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  // exit(1) => So if there is an error we wanna exit and provide 1, which basically for error.
  // Exit code 1 is used when unhandled fatal exceptions occur that were not handled.
  // Whereas Exit code 0 is used to terminate when no more async operations are happening.
  process.exit(1);
}
