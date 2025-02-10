import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// index.js is the main entry point in each folder, so no need to specify the index file
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { action as addJobAction } from './pages/AddJob';
import { loader as allJobsLoader } from './pages/AllJobs';

// We set up this here, so if it true it's going to be added to all of the pages, so this function run when our application load
export const checkDefaultTheme = () => {
  // We checking in localStorage if darkTheme property exist, and if it is, it will be true and if it's not it will be
  // false - So if it true we will see the dark theme background  and if it's not we will see the deafult white background
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  // console.log(isDarkTheme);

  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    // errorElement => We need to define our error page in our parent, and if there is an errors in some pages, they
    // will buble up to this gloabl Error page
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        // action => Function which allow us to handle the form submission, and every time that we'll submit the form,
        // we will invoke this function
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        // Loaders allow us to provide data to the route before it renders, so unlike the useEffect that the component
        // mounts and then we fetch all the data after the component rendered. In this case we'll provide the data
        // right away, so it's pre fetching the data before the component renders
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  // We need to provide our RouterProvider our routers in router to the router prop
  return <RouterProvider router={router} />;
};
export default App;
