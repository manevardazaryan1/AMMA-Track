import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../redux/slices/authenticationSlice";

export default function Account() {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"));
    const dispatch = useDispatch();

    useEffect(() => {
        const isLoggedIn = window.localStorage.getItem("isLoggedIn");
        if (isLoggedIn && isLoggedIn === 'ON') {
          dispatch(login());
        } else {
            return <Navigate to="/" />
        }
      }, [dispatch]);
    
    return (
        <div className="account-section">{user.email}</div>
    )
}