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
} from './pages';

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
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
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
