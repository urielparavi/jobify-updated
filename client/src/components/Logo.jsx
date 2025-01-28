import logo from '../assets/images/logo.svg';

const Logo = () => {
  return (
    <img
      src={logo}
      alt="jobify"
      className="logo"
      style={{ borderRadius: '30%' }}
    />
  );
};

export default Logo;
