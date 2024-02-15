import "./Header.css";

import { Button } from "../Button/Button";

import ammaTruckLogo from "../../images/amma-truck-logo.png";

import { useDispatch, useSelector } from "react-redux";
import { deleteActiveWorkspace } from "../../redux/slices/workspacesSlice";

import { Link } from "react-router-dom";

export const Header = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  let buttons;
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const dispatch = useDispatch();
  if (!loggedIn) {
    buttons = (
      <>
        <Link to="/login">
          <Button type="main">Login</Button>
        </Link>
        <Link to="/sign-up">
          <Button type="secondary">Sign-up</Button>
        </Link>
      </>
    );
  } else {
    const userAvatar = loggedUser ? loggedUser.email[0].toUpperCase() : "";
    buttons = (
      <>
        <Link to="/account">
          <Button type="account-btn">{userAvatar}</Button>
        </Link>
        <Link to="/log-out">
          <Button
            onClick={() => dispatch(deleteActiveWorkspace({}))}
            type="secondary"
          >
            Log Out
          </Button>
        </Link>
      </>
    );
  }

  return (
    <div className="header">
      <div className="container">
        <div className="header-wrapper">
          <Link to={`${loggedIn ? "/workspaces" : "/"}`}>
            <img src={ammaTruckLogo} alt="logo" />
            <p>AMMA-Track</p>
          </Link>
          <div className="header-buttons">{buttons}</div>
        </div>
      </div>
    </div>
  );
};
