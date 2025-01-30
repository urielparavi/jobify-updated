import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
  },
  // So whenever we create an instance we will get createdAt, updatedAt fields, and every time we'll do something
  // with our instance, we'll get the correct values - time/date
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);
