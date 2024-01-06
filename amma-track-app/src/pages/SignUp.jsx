import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validateUserName } from "../validations/validate";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../redux/slices/authenticationSlice";
import CryptoJS from 'crypto-js';

export default function SignUp() {
    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.auth.loggedIn);


    useEffect(() => {
        if (loggedIn) {
            navigate('/account');
        }
    }, [loggedIn, navigate]);

    const users = useSelector((state) => state.auth.users);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [userExists, setUserExists] = useState(false);
    const [errorClsses, setErrorClasses] = useState({});
    const [passwordEye, setPasswordEye] = useState(false);

    let userExistsBool = true;

    useEffect(() => {
        const uname = validateUserName(userName);
        const uemail = validateEmail(email);
        const upass = validatePassword(password);

        if (userName && uname !== "Success") {
            setErrors((prevErrors) => {return {...prevErrors, "username": uname}});
            setErrorClasses((prevErrorClasses) =>  { return {...prevErrorClasses, userNameError: "input-error"}});
        } else {
            setErrors((prevErrors) => {return {...prevErrors, "username": ""}});
            setErrorClasses((prevErrorClasses) =>  { return {...prevErrorClasses, userNameError: "valid-input"}});
        }

        if (email && uemail !== "Success") {
            setErrors((prevErrors) => {return {...prevErrors, "email": uemail}});
            setErrorClasses((prevErrorClasses) =>  { return {...prevErrorClasses, emailError: "input-error"}});
        } else {
            setErrors((prevErrors) => {return {...prevErrors, "email": ""}});
            setErrorClasses((prevErrorClasses) =>  { return {...prevErrorClasses, emailError: "valid-input"}});

        }

        if (password && Object.keys(upass).length) {
            setErrors((prevErrors) => {return {...prevErrors, "password": upass}});
            setErrorClasses((prevErrorClasses) =>  { return {...prevErrorClasses, passwordError: "input-error"}});
        } else {
            setErrors((prevErrors) => {return {...prevErrors, "password": ""}});
            setErrorClasses((prevErrorClasses) =>  { return {...prevErrorClasses, passwordError: "valid-input"}});
        }

    }, [userName, email, password]);

    const hashPassword = (password) => {
        return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    };

    const handleLoginFormOnsubmit = (e) => {
        e.preventDefault();

        if (!Object.values(errors).join("")) {
            users.forEach((item) => {
                if (item.email === email || item.userName === userName) {
                    userExistsBool = true;
                    setUserExists(() => true);
                } else {
                    userExistsBool = false;
                    setUserExists(() => false);
                }
            });
            
            if (!users.length || !userExistsBool) {
                dispatch(signUp({userName, email, password: hashPassword(password)}));
                setErrors(() => "");
                setEmail(() => "");
                setUserName(() => "");
                setPassword(() => "");
                navigate("/login");
            }
        }
    }

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case "username": 
                setUserName(() => e.target.value);
                break;
            case "email":
                setEmail(() => e.target.value);
                break;
            case "password":
                setPassword(() => e.target.value);
                break;
            default: 
        }
    }

    const togglePasswordEye = () => {
        setPasswordEye((value) => !value);
    }

    return (
        <div className="sign-up-section">
            <h2 className="auth-title">Sign Up</h2>
            {
                userExists && <div className="user-exists">User Alredy exists</div>
            }
            <form onSubmit={handleLoginFormOnsubmit} autoComplete="off" className="auth-form">
                <div>
                    <label htmlFor="username" >User Name</label>
                    <input type="text" name="username" id="username" placeholder="User Name" className={userName && errorClsses.userNameError} value={userName} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="email" >Email</label>
                    <input type="text" name="email" id="email" placeholder="Email" className={email && errorClsses.emailError} value={email} onChange={handleInputChange}/>
                </div>
                <div>
                    <div className="pass-label-block">
                        <label htmlFor="password" >Password</label>
                        <div className={`password-block ${password && errorClsses.passwordError}`}>
                            <input type={passwordEye ? "text": "password"} name="password" id="password" placeholder="Password" value={password} onChange={handleInputChange} autoComplete="off"/>
                            {
                                password && <button className="password-eye" type="button" onClick={togglePasswordEye}><i className={passwordEye ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i></button>
                            }
                        </div>
                    </div>
                </div>
                <input type="submit" value="Sign Up" disabled={!userName || !email || !password}/>
            </form>
            {
                Object.values(errors).join("") && <div className="errors">
                    {
                        Object.keys(errors).map((error) => 
                            {
                                if (typeof errors[error] !== "object")
                                    return errors[error]  && <div className="error" key={error}>{ errors[error] }</div>
                                
                                
                                return Object.keys(errors[error]).map(err => 
                                    <div key={err}>{ errors[error][err] }</div>
                                )
                            }
                        )
                    }
                </div>
            }
        </div>
    )
}