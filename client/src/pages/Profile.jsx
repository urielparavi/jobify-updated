import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  // avatar => the name attribute
  const file = formData.get('avatar');

  // So if the file present, meaning that he inserted an image, and in that case we wanna check the size,
  // because we not allowing file that bigger then 0.5 MB
  if (file && file.size > 500000) {
    toast.error('Image size to large');
    return null;
  }
  try {
    // Because we sending file we send the formData to our endpoint in server and not the data as before
    await customFetch.patch('/users/update-user', formData);
    toast.success('Profile updated successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  // Whether if we succeed or not, we wanna return null because we wanna stay on profile page as we where
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      {/* When we send a file to the server the encType will be multipart/form-data because the file is binari data and not json like regular form  */}
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              // The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type
              //  specifiers, describing which file types to allow.
              // So we looking only specific type of files, and it going to be image files
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
