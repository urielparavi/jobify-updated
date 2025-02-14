import { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import { checkDefaultTheme } from '../App';

const DashboardContext = createContext();

const DashboardLayout = () => {
  // temp
  const user = { name: 'john' };
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
    console.log('logout user');
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
              <Outlet />
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
