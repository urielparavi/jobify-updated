import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// Every time that we using this function we need to return some value from it - no matter what it is,
// it could be null, but it need to return something
export const action = async ({ request }) => {
  const formData = await request.formData();
  // Object.fromEntries() => turns array of arrays into an object
  const data = Object.fromEntries(formData);

  // console.log(data);// => {name:'uriel', lastName:'paravi', location:'london', email:'test@example.com', password:'test1234'}

  try {
    // .post(http://localhost:5100/api/v1/auth/register)
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    // console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  // console.log(navigation);
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      {/* Form => Component that coming from React router dom. it's still going to be regular form that get CSS end other elements normally, but it also able to use the action function */}
      {/* If we wanna check the validation form, we can do it with noValidate => this disabled the required from the browser */}
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="uriel" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="paravi"
        />
        <FormRow type="text" name="location" defaultValue="london" />
        <FormRow type="email" name="email" defaultValue="test@example.com" />
        <FormRow type="password" name="password" defaultValue="test1234" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
