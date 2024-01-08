import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login } from "../redux/slices/authenticationSlice";

export default function Login() {
    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const [passwordEye, setPasswordEye] = useState(false);

    useEffect(() => {
        if (loggedIn) {
            navigate('/workspaces');
        }
    }, [loggedIn, navigate]);

    const users = useSelector((state) => state.auth.users);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userIsNotExists, setUserIsNotExists] = useState(false);

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
    }

    const handleLoginForm = (e) => {
        e.preventDefault();
        for (const user of users) {
            console.log(user)
            // if (user.payload.email === email && user.payload.password === CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)) {
            //     window.localStorage.setItem('loggedUser', JSON.stringify(user.payload));
            //     dispatch(login(user.payload));
            //     setUserIsNotExists(() => false);
            //     navigate("/workspaces");
            // }
        }
        if (email === 'admin' && password === 'admin') {
            setUserIsNotExists(() => false);
            navigate("/workspaces");
            window.localStorage.setItem('loggedUser', JSON.stringify({ userName: 'admin', email: 'admin@gmail.com', password: 'admin' }));
            dispatch(login({ userName: 'admin', email: 'admin@gmail.com', password: 'admin' }));
        }

        setUserIsNotExists(() => true);
    }

    const togglePasswordEye = () => {
        setPasswordEye((value) => !value);
    }

    return (
        <div className="login-section">
            <h2 className="auth-title">Login</h2>

            {
                userIsNotExists && <div className="user-is-not-exists">User isn't exists</div>
            }

            <form autoComplete="off" onSubmit={handleLoginForm} className="auth-form">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder="Email" value={email} onChange={handleInputChange} />
                </div>
                <div>
                    <div className="pass-label-block">
                        <label htmlFor="password">Password</label>
                        <div className="password-block">
                            <input type={passwordEye ? "text" : "password"} name="password" id="password" placeholder="Password" value={password} autoComplete="false" onChange={handleInputChange} />
                            {
                                password && <button className="password-eye" type="button" onClick={togglePasswordEye}><i className={passwordEye ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i></button>
                            }
                        </div>
                    </div>
                </div>
                <input type="submit" value="Login" disabled={!email || !password} />
            </form>
        </div>
    )
}