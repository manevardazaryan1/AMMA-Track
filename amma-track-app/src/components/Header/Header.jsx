import './Header.css';
import { useSelector } from "react-redux";
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';

export const Header = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  let buttons;
  if (!loggedIn) {
    buttons = (
      <>
        <Link to='/login'><Button type='main'>Login</Button></Link>
        <Link to='/sign-up'><Button type='secondary'>Sign-up</Button></Link>
      </>
    );
  } else {
    const userAvatar = JSON.parse(window.localStorage.getItem("loggedUser")).email[0].toUpperCase();
    buttons = (
      <>
        <Link to='/account'><Button type='account-btn'>{userAvatar}</Button></Link>
        <Link to='/log-out'><Button type='secondary'>Log Out</Button></Link>
      </>
    )
  }

  return (
    <div className='header'>
      <div className="container">
        <div className="header-wrapper">
          <Link to='/'>
            <img src={logo} alt="logo" />
            <p>AMMA-Track</p>
          </Link>
          <div className='header-buttons'>
            {buttons}
          </div>
        </div>
      </div>
    </div>
  );
};
