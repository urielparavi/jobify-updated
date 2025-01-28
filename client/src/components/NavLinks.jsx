import { useDashboardContext } from '../pages/DashboardLayout';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

// We set up a separate component for the links so that we can use it both for the SmallSidebar and also the BigSidebar
const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            // It will be true only in BigSidebar because in SmallSidebar we don't pass it, so only when we navigate
            // in SmallSidebar when we click on the link, the sidebar will close
            onClick={isBigSidebar ? null : toggleSidebar}
            // With React Router we adding the active class to our link whenever we press the link, but since we have
            // a nested structure and the dashboard is the parent, our link add job/dashboard always stays active,
            // so dashboard always matches the route since it's a parent. In order to avoid that we just need to add
            // the end prop to the NavLink, and once we do that our add job link doesn't get the active class, unless
            // we actually navigate to that page
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
