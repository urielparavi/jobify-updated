import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';

// Every time that we using this function we need to return some value from it - no matter what it is,
// it could be null, but it need to return something
export const action = async ({ data }) => {
  console.log(data);
  return null;
};

const Register = () => {
  return (
    <Wrapper>
      {/* Form => Component that coming from React router dom. it's still going to be regular form that get CSS end other elements normally, but it also able to use the action function */}
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="john" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="smith"
        />
        <FormRow type="text" name="location" defaultValue="london" />
        <FormRow type="email" name="email" defaultValue="john@example.com" />
        <FormRow type="password" name="password" defaultValue="test1234" />
        <button type="submit" className="btn btn-block">
          submit
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
