import { Link, Form, redirect, useActionData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  // Object.fromEntries() => turns array of arrays into an object
  const data = Object.fromEntries(formData);
  // console.log(data);// => { email: 'test@example.com', password: 'test1234' }
  const errors = { msg: '' };
  if (data.password.length < 3) {
    errors.msg = 'password too short';
    return errors;
  }
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    // toast.error(error?.response?.data?.msg);
    errors.msg = error?.response?.data?.msg;
    return errors;
  }
};

const Login = () => {
  // useActionData(); => Returns the data from the most recent route action or undefined if there isn't one.
  // This hook only returns action data from the route in context - it can not access data from other parent or child routes.
  // So in our example we assign the errors for useActionData but it could be any type of data that we assigned
  //  from the recent action
  const errors = useActionData();
  // So when our component mount, or when our data sent successfully, our errors will be undefined, and whenever that will be
  // errors they will show up like this - {msg: 'invalid credentials'}
  // console.log(errors);

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>login</h4>
        {errors?.msg && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <FormRow type="email" name="email" defaultValue="admin@example.com" />
        <FormRow type="password" name="password" defaultValue="test1234" />
        <SubmitBtn />
        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
