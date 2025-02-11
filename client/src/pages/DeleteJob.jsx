import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

// With the latest React router dom, we don't need set JSX, we can set only a function/ality
export const action = async ({ params }) => {
  // console.log(params);
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success('Job delted successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect('/dashboard/all-jobs');
};
