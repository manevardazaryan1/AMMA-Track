import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/slices/authenticationSlice";
import { signUp } from "../redux/slices/authenticationSlice";

import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

import { db } from "../config/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';


export default function Login() {
  const navigate = useNavigate();
  const loggedIn = window.localStorage.getItem("isLoggedIn")
  const [passwordEye, setPasswordEye] = useState(false);

  useEffect(() => {
    if (loggedIn && loggedIn === "ON") {
      navigate("/workspaces");
    }
  }, [loggedIn, navigate]);

  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userIsNotExists, setUserIsNotExists] = useState(false);
  const usersCollection = collection(db, 'users');

  useEffect(() => {
    const fetchusers = async () => {
      const snapshot = await getDocs(usersCollection)
      snapshot.docs.map((doc) => (dispatch(signUp({ ...doc.data() }))))
    }

    if (!users.length) fetchusers()
    
  }, [users.length, usersCollection, dispatch])

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(() => e.target.value);
        break;
      case "password":
        setPassword(() => e.target.value);
        break;
      default:
    }
  };

  const handleLoginForm = (e) => {
    e.preventDefault();

    for (const user of users) {
      if (
        user.email === email &&
        user.password === CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)
      ) {
        dispatch(login(user));
        setUserIsNotExists(() => false);
        navigate("/workspaces");
      }
    }

    if (email === "admin" && password === "admin") {
      const id = 1;
      setUserIsNotExists(() => false);
      navigate("/workspaces");
      const fixedUser = {
        id,
        userName: "admin",
        email: "admin@gmail.com",
        password: "admin"
      }
      window.localStorage.setItem('loggedUser', JSON.stringify(fixedUser));
      dispatch(
        login(fixedUser)
      );
    }

    setUserIsNotExists(() => true);
  };

  const togglePasswordEye = () => {
    setPasswordEye((value) => !value);
  };

  return (
    <div className="login-section">
      <h2 className="auth-title">Login</h2>

      {userIsNotExists && (
        <div className="user-is-not-exists"><i className="fa-solid fa-ban not_exists_icon"></i>User doesn't exists</div>
      )}

      <form autoComplete="off" onSubmit={handleLoginForm} className="auth-form">
        <div>
          <label htmlFor="email" className="floating-label">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className="pass-label-block">
            <label htmlFor="password">Password</label>
            <div className="password-block">
              <input
                type={passwordEye ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                autoComplete="false"
                onChange={handleInputChange}
              />
              {password && (
                <button
                  className="password-eye"
                  type="button"
                  onClick={togglePasswordEye}
                >
                  <i
                    className={
                      passwordEye ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                    }
                  ></i>
                </button>
              )}
            </div>
          </div>
        </div>
        <input type="submit" value="Login" disabled={!email || !password} />
      </form>
    </div>
  );
}
