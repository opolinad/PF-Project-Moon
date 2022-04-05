import React from "react";
import { useState } from "react";
import { Toast } from "../helpers/alerts/alert.js";
import styles from './changePassword.module.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useParams } from "react-router";

//validacion de errores
function validar(input) {
    let errors = {}
    if (!input.email) {
        errors.email = "This field can't be empty"
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = "You must enter a valid email"
    }
    if (!input.password) {
        errors.password = "This field can't be empty"
    } else if (input.password.trim().length < 8) {
        errors.password = 'It must must have at least 8 characters'
    } else if (!/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(input.password)) {
        errors.password = 'It must have an uppercase, a lowercase and a digit'
    }
    if (!input.confirmpassword) {
        errors.confirmpassword = 'Confirm your password'
    } else if (input.password !== input.confirmpassword) {
        errors.confirmpassword = 'Passwords must be the same'
    }
    return errors
}

export default function ChangePassword() {
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmpassword: ""
    })
    const {idUser} = useParams();
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(
            validar({
                ...input,
                [e.target.name]: e.target.value
            })
        )
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!input.email || !input.password || !input.confirmpassword) {
            Toast.fire({
                icon: 'info',
                title: 'Debe llenar todos los campos',
            });
            setInput({
                email: "",
                password: "",
                confirmpassword: ""
            })
        } else {
            //Hacer el put para cambiar la contraseña
            await axios.put(`/api/user/${idUser}`, {password:input.confirmpassword});
            Toast.fire({
                icon: 'success',
                title: 'Password updated',
            });
            setInput({
                email: "",
                password: "",
                confirmpassword: ""
            });
        }
    }

    return (
        <div id={styles.registerCont}>
            <Link id={styles.backLink} to={"/"}>
                <button id={styles.backBut}><FontAwesomeIcon icon={ faAngleLeft }/> Back</button>
            </Link>

            <div id={styles.decoCont}>
                <img id={styles.landingImg} src="./logo.svg" alt="logo not found" />
                <h1>Protocol Moon</h1>
            </div>
            <form id={styles.formRegister} onSubmit={e => handleSubmit(e)}>
                    <div className={styles.inputTextCont}>
                        <label>Email:</label>
                        <input className={styles.inputText} onChange={e => handleChange(e)} type="email" name="email" value={input.email} />
                        {errors.email && (
                            <span className={styles.error}>
                                <small>{errors.email}</small>
                            </span>
                        )}
                    </div>
                    <div className={styles.inputTextCont}>
                        <label>Password:</label>
                        <input className={styles.inputText} onChange={e => handleChange(e)} type="password" name="password" value={input.password} />
                        {errors.password && (
                            <span className={styles.error}>
                                <small>{errors.password}</small>
                            </span>
                        )}
                    </div>
                    <div className={styles.inputTextCont}>
                        <label>Repeat password:</label>
                        <input className={styles.inputText} onChange={e => handleChange(e)} type="password" name="confirmpassword" value={input.confirmpassword} />
                        {errors.confirmpassword && (
                            <span className={styles.error}>
                                <small>{errors.confirmpassword}</small>
                            </span>
                        )}
                    </div>
                    <input type='submit' value='Change Password' id={styles.submitBut}/>
            </form>
        </div>
    )
}