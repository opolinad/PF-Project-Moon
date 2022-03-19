import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { postUsers, getUsers } from "../redux/actions/LandingPage";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { loginUser } from '../redux/apiCalls/loginCalls'
// import CookiesPolicy from '../CookiesPolicy/CookiesPolicy';
import styles from './landingPage.module.css'
import { Toast } from "../helpers/alerts/alert";

function validate(input) {
    let errors = {};

    if (!input.email) {
        errors.email = "Debe ingresar un email";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = "El email debe ser valido";
    }

    if (!input.password) {
        errors.password = "Debe ingresar una contraseña";
    }

    return errors;
}

export default function LandingPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const clientId = "";
    const [showLoginButtom, setShowLoginButtom] = useState(true);
    const [showLogoutButtom, setShowLogoutButtom] = useState(false);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        email: "",
        password: "",
    });


    const onLoginSuccess = (res) => {
        console.log("Login success:", res.profileObj);
        setShowLoginButtom(false);
        setShowLogoutButtom(true);
    };


    const onFailureSuccess = (res) => {
        console.log("Login failed:", res);
    };

    const onSingoutSuccess = () => {
        alert("Has sido desconectado con éxito");
        setShowLoginButtom(true);
        setShowLogoutButtom(false);
    };

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.email === '' || input.password === '') {
            Toast.fire({
                icon: 'info',
                title: 'invalid credentials',
            })
            setInput({ email: '', password: '' })
        } else {
            loginUser(dispatch, input)
            if (user.currentUser) {
                Toast.fire({
                    icon: 'success',
                    title: 'Login success',
                })
                navigate('/home')
            }
        }
    }

    useEffect(() => {
        (() => {
            user.error && Toast.fire({
                icon: 'info',
                title: 'invalid credentials',
            });
            user.error && setInput({ email: '', password: '' })
        })()
    }, [user.error])

    return (
        <div className={styles.landingContainer} >
            <div className={styles.ladingLeft} >
                <img className={styles.landingImg} src="./logo.svg" alt="logo not found" />
                <h1 className={styles.landingTitle} >MOON PROTOCOL</h1>
                <p className={styles.landingDesc}>The passion of design in one place, we will make it to the moon</p>
            </div>
            <div className={styles.ladingRight}>

                {/* <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder="email"
                        name="email"
                        value={input.email}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.email && (
                        <span className="error">
                            <small>{errors.email}</small>
                        </span>
                    )}
                    <input
                        type="teSxt"
                        placeholder="password"
                        name="password"
                        value={input.password}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.password && (
                        <span className="error">
                            <small>{errors.password}</small>
                        </span>
                    )}

                    <button type="submit">Log in</button>
                </form> */}
                {/* <div>
                    <img src="" alt="logo not found" />
                    <h1>MOON PROTOCOL</h1>
                    <p>The passion of design in one place, we will make it to the moon</p>
                </div> */}
                <form className={styles.ladingFormCard}>
                    <input
                        className={styles.ladingInput}
                        type="email"
                        placeholder='email'
                        name='email'
                        value={input.email}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.email && (
                        <span className='error'>
                            <small>{errors.email}</small>
                        </span>
                    )}
                    <input
                        className={styles.ladingInput}
                        type="password"
                        placeholder='password'
                        name='password'
                        value={input.password}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.password && (
                        <span className='error'>
                            <small>{errors.password}</small>
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={handleSubmit}
                    >LOGIN</button>
                    <Link to={"/password_reset"}>Forgot password?</Link>
                    <Link to={"/register"}>
                        <div>create a new account</div>
                    </Link>
                    <p>Publish your illustrations and discover others!</p>
                    {/* <div>
                        {showLoginButtom ? (
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Login"
                                onSuccess={onLoginSuccess}
                                onFailure={onFailureSuccess}
                                cookiePolicy={"single_host_origin"}
                            />
                        ) : null}
                        {showLogoutButtom ? (
                            <GoogleLogout
                                clientId={clientId}
                                buttonText="Logout"
                                onLogoutSuccess={onSingoutSuccess}
                            ></GoogleLogout>
                        ) : null}
                    </div> */}
                </form>

            </div>
            {/* <div id="cookies-policy">
            <h3>Cookies</h3>
            <p>Most mordern websites place small filles called "cookies" on your computer which improve your browsing experience and enable the website to function effectively.</p>    
            <button>OK</button>
            <Link to={CookiesPolicy}><button>Cookies policy</button></Link> 
            </div>*/}
        </div>
    );
}
