import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  // console.log(createdAt); // => 2025-02-09T18:46:33.562Z
  // Because our date not looking good, we format it with a shape of a month, day and year
  const date = day(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        {/* charAt(0) => We take the first character from the company property. So google will be G  etc..*/}
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          {/* .. => Represent one level up, so it's the dashboard. Alternative way is to={`/dashboard/edit-job/${_id}`}, and here we provide the url for the EditJob with the dynamic job id */}
          <Link to={`../edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          {/* Since is going to be delete functionality we need to go with post method */}
          {/* action => We provide where that functionality is going to be handled. So in all our other examples, the edit job, add job etc, we were not provided this action, because that we want the default behavior - that the action will be sent back to the same page, so the current page handle it and send the form. But here we want to send it to delete-job route to handle it */}
          <Form method="post" action={`../delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Job;
