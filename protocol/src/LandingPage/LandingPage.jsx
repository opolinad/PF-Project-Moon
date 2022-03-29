import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { postUsers, getUsers } from "../redux/actions/LandingPage";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../ReduxToolkit/apiCalls/loginCall'
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
        }
    }
    const handleClickPlatform = (e) => {
        // let winWidth = 400;
        // let winHeight = 600;
        // let top = window.outerHeight / 2 + window.screenY - (winWidth / 2);
        // let left = window.outerWidth / 2 + window.screenX - (winHeight / 2);
        // window.open("http://localhost:3001/api/login/google", "Google log in", `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${winWidth},height=${winHeight},left=${left},top=${top}`);
        // window.open("http://localhost:3001/api/login/google");
        let url = process.env.VERCEL_ENV === "production"?"https://protocolmoon.herokuapp.com/api/login/":"http://localhost:3001/api/login/"
        window.location.href = url+e.target.innerText.toLowerCase();
    }


    useEffect(() => {
        (() => {
            user.currentUser && Toast.fire({
                icon: 'success',
                title: 'Login success',
            });
            user.currentUser && navigate('/home')
        })()
    }, [user.currentUser])

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
                <h1 className={styles.landingTitle} >PROTOCOL MOON</h1>
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
                    <div className={styles.landingInputCont}>
                        <input
                            className={styles.ladingInput}
                            type="email"
                            placeholder='E-mail'
                            name='email'
                            value={input.email}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {errors.email && (
                            <span className={styles.landingInputError}>
                                <small>{errors.email}</small>
                            </span>
                        )}
                    </div>

                    <div className={styles.landingInputCont}>
                        <input
                            className={styles.ladingInput}
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={input.password}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {errors.password && (
                            <span className={styles.landingInputError}>
                                <small>{errors.password}</small>
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        id={styles.loginBut}
                        onClick={handleSubmit}
                    >LOGIN</button>

                    <div id={styles.landingLinksCont}>
                        <Link to={"/password_reset"}>Forgot password?</Link>
                        <Link to={"/register"}>create a new account</Link>
                    </div>


                    <p style={{ color: "#F0E9D2" }}>Publish your illustrations and discover others!</p> {/* Esto no se deja ver porque la letra está negra */}

                </form>
                <div id={styles.emailAccesCont}>
                    <button onClick={handleClickPlatform}>Google</button> {/* falta estilo del botón. Se requiere modificar estilos porque no se deja renderizar fuera del form */}
                    <button onClick={handleClickPlatform}>Microsoft</button>
                </div>


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
