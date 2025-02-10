import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

// if we want to access to the params, route params/path variable/path parameter in the actual component,
//  we can destructure it from our functions - our loader and the action functions
export const loader = async ({ params }) => {
  console.log(params);

  return null;
};

export const action = async () => {
  return null;
};

const EditJob = () => {
  // The way for access our params in the actual component if we don't have action/loader functions
  // const params = useParams();
  // console.log(params);

  return <h1>EditJob Page</h1>;
};
export default EditJob;
