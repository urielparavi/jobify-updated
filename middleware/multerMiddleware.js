import multer from 'multer';

// Multer is a popular middleware package for handling multipart/form-data in Node.js web applications. It is commonly used for
// handling file uploads. Multer simplifies the process of accepting and storing files submitted through HTTP requests by
// providing an easy-to-use API. It integrates seamlessly with Express.js and allows developers to define upload destinations,
// file size limits, and other configurations.

// If we don't needs image proccessing we will store the image in the diskStorage - so, in our file system
// Storing the file. Here we don't need to process the image becasue that we using cloudinary. If we wanted to process
// the image we where use the memoryStroage({})
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // The first argmuent is an error if there is one, and if not we pass null
    // The second argument is the actual destination
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    // originalname => So whatever is the original file name is going to be used when we save this file with multer
    const filename = file.originalname;
    cb(null, filename);
  },
});

// We passing our storage variable to multer
const upload = multer({ storage });

export default upload;
