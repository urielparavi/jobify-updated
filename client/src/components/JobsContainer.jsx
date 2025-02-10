import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';

const JobsContainer = () => {
  // So here we get the object with the jobs array inside
  const { data } = useAllJobsContext();
  // Here we destructure our jobs array out from the object, so we can loop over him
  const { jobs } = data;

  // console.log(jobs);

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};
export default JobsContainer;
