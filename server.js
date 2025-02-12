import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

const app = express();

// routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

// Cloudinary => platform where we can store, optimize and deliver images, so we will not need to store there URL
// in our DB, and once we push it up, we'll get back the URL and now the image is going to be stored in cloudinary,
// so it's always going to be there, and we'll just utilize that URL on the front-end,
// Which points to the location in the cloudinary where it is stored. so as a result
//  the image is not going to dissappear on the server in the regular way (more on README)..
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Because we work with ES6 and not with Common JS syntax, we need to set up our __dirname which points to the
// current folder, because when it will go to production will be there different enviroments
const __dirname = dirname(fileURLToPath(import.meta.url));
// The process object is a global that provides information about, and control over, the current Node. js process. As a
// global, it is always available to Node. js applications without using require() and inside of him we have
// the env object that has different environment variables and we can also sets new ones there, so with dotenv we could
// store our environment variables in .env file, and it will save it in the env object
// console.log(process.env);
if (process.env.NODE_ENV === 'development') {
  // Give us informatin/logs about the request, super useful when connect backend to frontend
  app.use(morgan('dev'));
}

// const path1 = path.join('content', 'subfolder', 'test.txt');
// console.log(path1); // => content\subfolder\test.txt

// const path2 = path.resolve('content', 'sobfolder', 'test.txt');
// console.log(path2); // =>  C:\Coding\jobify\content\sobfolder\test.txt

// const path3 = path.join(__dirname, './public');
// console.log(path3); // =>  C:\Coding\jobify\public

// const path4 = path.resolve(__dirname, './public');
// console.log(path4); // =>  C:\Coding\jobify\public

// Serving static files in the public folder
// Static files => they are static files that will remain the same thing in every request like fiveicon, CSS, JS, images etc,
// and they are sitting in our file system and we cannot access them using our routes. So express will try to find route
// for this URL and if it will not find, it will go to the public folder,
// and for access to them and serve our static files we need to use a built-in middleware express.static(...)
app.use(express.static(path.resolve(__dirname, './public')));
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
