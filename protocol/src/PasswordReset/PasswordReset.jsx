import React from "react";
import { useState } from "react";
import styles from './passwordReset.module.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import logo from "../logo.svg"

//validacion de errores
function validar(input) {
    let errors = {};
    if (!input.email) {
        errors.email = "This field can't be empty";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = "You must enter a valid email";
    }
    return errors;
}

export default function PasswordReset() {
    const [errors, setErrors] = useState({});
    const [error, setError] = useState({ trial: false, valid: false, platforms: false });
    const [email, setEmail] = useState("");

    function handleChange(e) {
        setEmail(e.target.value);
        if (!email) setError({ trial: false, valid: false, platforms: false });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        let res = await axios.get(`/api/password?email=${email}`);
        if (res.data.msg === "User doesn't exist") {
            setError({ trial: true, valid: false, platforms: false });
        } else if (res.data.msg === "User must log in through Google/Microsoft") {
            setError({ trial: true, valid: false, platforms: true });
        } else {
            setError({ trial: true, valid: true, platforms: false });
        }
    }

    return (
        <div id={styles.registerCont}>
            <Link id={styles.backLink} to={"/"}>
                <button id={styles.backBut}><FontAwesomeIcon icon={faAngleLeft} /> Back</button>
            </Link>

            <div id={styles.decoCont}>
                <img id={styles.landingImg} src={logo} alt="logo not found" />
                <h1>Protocol Moon</h1>
            </div>
            <form id={styles.formRegister} onSubmit={handleSubmit}>
                <div className={styles.inputTextCont}>
                    <label>Please enter your email:</label>
                    <input className={styles.inputText} onChange={handleChange} type="email" name="email" value={email} />
                    {errors.email && (
                        <span className={styles.error}>
                            <small>{errors.email}</small>
                        </span>
                    )}
                </div>
                <div>
                    {(error.trial === true && error.valid === false && error.platforms === false) && <p className={styles.error}>The email provided is not valid</p>}
                    {(error.trial === true && error.valid === true && error.platforms === false) && <p className={styles.error}>Recovery email sent</p>}
                    {(error.trial === true && error.valid === false && error.platforms === true) && <p className={styles.error}>Use Google/Microsoft services to log in</p>}
                </div>
                <input type='submit' value='Search' id={styles.submitBut} />
            </form>
        </div>
    )
}
