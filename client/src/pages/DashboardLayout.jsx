import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { createContext, useContext, useState } from 'react';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

//
export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    // The difference between *redirect* and *navigate* - redirect is used in actions and loaders,
    // And useNavigate is a hook and it can only be used in React Hooks and React Components.

    // If we don't succeed to get the user, it's mean that we have any issue with JWT, so the user will have to repeat
    // the login step
    return redirect('/');
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  // So the userLoaderData give us access to what we have in the loader function in our component, and the data will be
  // available right away, so not like useEffect that the data was available after the component rendered, here it will
  // be available immediately before the component redered
  const { user } = useLoaderData();
  // console.log(user);
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  // So if user enabled a darkTheme and exist etc, we save him his darkTheme as a default state

  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme; // So newDarkTheme return true of false
    setIsDarkTheme(newDarkTheme);
    // We adding a class 'dark-theme' to our body and toggle it - so if don't heve a 'dark-theme' class we will adding it,
    // and if it exist we will remove it.
    // The classList.toggle() method also has an optional second argument called force that can be used to make the toggle
    // only occur once. If set to false, the class will only be removed. If set to true , the class will only be added.
    document.body.classList.toggle('dark-theme', newDarkTheme);
    // We save in localStorage our key value - 'darkTheme', true/false
    localStorage.setItem('darkTheme', newDarkTheme);
    // console.log(newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {/*context => special prop that we can leverage to inject props into Outlet, making them accessible to all its child components */}
              {/* So we pass our user through the context prop to all the pages/components that are inside of those page, so the children of the DashboardLyaout - addJob, Stats, AllJobs, Profile, Admin */}
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
// So our custom hook useContext contain all our values and this way we import only this and only one time in other files.
// We don't need to import like this - createContext(DashboardContext), because this way
// we will need to import createContext from react and also import our variable DashboardContext
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
