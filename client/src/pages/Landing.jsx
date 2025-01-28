import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';

import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby single-origin coffee mlkshk cupping, pinterest chartreuse
            typewriter 3 wolf moon readymade meh bespoke 8-bit marfa. Cliche
            readymade leggings, pop-up tilde franzen taxidermy actually small
            batch pug biodiesel tofu. Deep v unicorn retro, actually health goth
            vice gochujang 8-bit chartreuse lumbersexual crucifix. Pop-up
            listicle bodega boys, craft beer vaporware raclette woke roof party
            lyft fashion axe intelligentsia occupy. Unicorn try-hard shabby
            chic, chicharrones fashion axe gatekeep blue bottle normcore echo
            park cold-pressed mukbang trust fund ugh. Lumbersexual shaman la
            croix
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
