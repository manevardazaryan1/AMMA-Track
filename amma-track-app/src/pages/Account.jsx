import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { login } from "../redux/slices/authenticationSlice"; 

export default function Account() {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"));
    const dispatch = useDispatch();

    useEffect(() => {
        const isLoggedIn = window.localStorage.getItem("isLoggedIn");
        if (isLoggedIn && isLoggedIn === 'ON') {
          dispatch(login(JSON.parse(window.localStorage.getItem("loggedUser"))));
        } else {
            return <Navigate to="/" />
        }
      }, [dispatch]);

    return (
        user && <div className="account-section">{user.email}</div>
    )
}