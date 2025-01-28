import Wrapper from '../assets/wrappers/BigSidebar';
import NavLinks from './NavLinks';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          // Because whenever we access our dashboard pages the showSidebar will be false, and we want to show our BigSidebar
          // on the start when we enter this pages, we set the show-sidebar class when showSidebar false, so we can see
          // the BigSidebar immediate
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          {/* Because we don't want to close the sidebar every time we navigate in our pages in the links. We wanna do it on a only in small sidebar, but we don't wanna do it when we click on a nav link which in the BigSidebar, so we pass this prop isBigSidebar that will be true only in BigSidebar because in SmallSidebar we don't pass it */}
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
