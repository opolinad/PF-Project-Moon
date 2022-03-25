import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toast } from "../helpers/alerts/alert.js";
import { clearRegister, registerUser } from "../ReduxToolkit/apiCalls/regsterCall";
import styles from './register.module.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

//validacion de errores
function validar(input) {
    let errors = {}

    if (!input.email) {
        errors.email = "Debe ingresar un email"
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = "El email debe ser valido"
    }

    if (!input.password) {
        errors.password = 'Debe ingresar una contraseña'
    } else if (input.password.trim().length < 8) {
        errors.password = 'Debe tener mínimo 8 caracteres'
    } else if (!/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(input.password)) {
        errors.password = 'Debe tener una mayúscula, una minúscula y un dígito'
    }

    if (!input.confirmpassword) {
        errors.confirmpassword = 'Confirme su contraseña'
    } else if (input.password !== input.confirmpassword) {
        errors.confirmpassword = 'Las contraseñas no coinciden'
    }

    return errors
}

const Register = () => {
    const dispatch = useDispatch()
    const currentRegister = useSelector(state => state.register)
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        categories: []
    })

    const categoriesArray = [
        'anime',
        'comics',
        'customization',
        'digitalart',
        'fantart',
        'fantasy',
        'gameart',
        'horror',
        'photography',
        'pixelart',
        'sciencefiction',
        'streetart',
        'wallpaper']

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

    const handleSelect = (e) => {
        if (input.categories.includes(e.target.value)) return alert('ya esta en la lista')
        setInput(prev => {
            return {
                ...prev,
                categories: [...input.categories, e.target.value]
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.email || !input.password || !input.confirmpassword || input.categories.length <= 0) {
            Toast.fire({
                icon: 'info',
                title: 'Debe llenar todos los campos',
            });
            setInput({
                email: "",
                password: "",
                confirmpassword: "",
                categories: []
            })
        } else {
            const { email, password, categories } = input
            registerUser(dispatch, { email, password, categories })
        }
    }

    //console.log(currentRegister.registerUser)

    useEffect(() => {
        (() => {
            currentRegister.registerUser && Toast.fire({
                icon: 'success',
                title: 'User Created',
            });
            currentRegister.registerUser && navigate('/')
            currentRegister.registerUser && setInput({
                email: "",
                password: "",
                confirmpassword: "",
                categories: []
            })
            currentRegister.registerUser && clearRegister(dispatch)
        })()
    }, [currentRegister.registerUser])

    useEffect(() => {
        (() => {
            currentRegister.error && Toast.fire({
                icon: 'info',
                title: 'Hubo un error en el servidor',
            });
            currentRegister.error && setInput({
                email: "",
                password: "",
                confirmpassword: "",
                categories: []
            })
        })()
    }, [currentRegister.error])


    return (
        <div id={styles.registerCont}>
            <Link id={styles.backLink} to={"/"}>
                <button id={styles.backBut}><FontAwesomeIcon icon={ faAngleLeft }/> Back</button>
            </Link>

            <div id={styles.decoCont}>
                <img id={styles.landingImg} src="./logo.svg" alt="logo not found" />
                <h1>Protocol Moon</h1>
            </div>
            <form
                id={styles.formRegister}
                onSubmit={e => handleSubmit(e)}>

                    <div>
                        {/* <label>Nombre:</label>
                        <input onChange={e => handleChange(e)} type="text" name="firstName" value={input.firstName}/>
                        {errors.firstName && (
                        <span className='error'>
                            <small>{errors.firstName}</small>
                        </span>
                        )}
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input onChange={e => handleChange(e)} type="text" name="lastName" value={input.lastName}/>
                        {errors.lastName && (
                        <span className='error'>
                            <small>{errors.lastName}</small>
                        </span>
                        )} */}
                    </div>
                    <div className={styles.inputTextCont}>
                        <label>Correo electrónico:</label>
                        <input className={styles.inputText} onChange={e => handleChange(e)} type="email" name="email" value={input.email} />
                        {errors.email && (
                            <span className={styles.error}>
                                <small>{errors.email}</small>
                            </span>
                        )}
                    </div>
                    <div className={styles.inputTextCont}>
                        <label>Contraseña:</label>
                        <input className={styles.inputText} onChange={e => handleChange(e)} type="password" name="password" value={input.password} />
                        {errors.password && (
                            <span className={styles.error}>
                                <small>{errors.password}</small>
                            </span>
                        )}
                    </div>
                    <div className={styles.inputTextCont}>
                        <label>Repetir contraseña:</label>
                        <input className={styles.inputText} onChange={e => handleChange(e)} type="password" name="confirmpassword" value={input.confirmpassword} />
                        {errors.confirmpassword && (
                            <span className={styles.error}>
                                <small>{errors.confirmpassword}</small>
                            </span>
                        )}
                    </div>

                    <div className={styles.inputTextCont}>
                        <label className={styles.labelText}>
                            Categories:
                        </label>
                        <select 
                            className={styles.selectCategories}
                            id='categories'
                            name='categories'
                            onChange={(e) => handleSelect(e)}
                            required
                        >
                            <option className={styles.categoriesOption} value='categories'> Choose some categories </option>
                            {categoriesArray.map((c,i) => (
                                <option key={"option_category_"+i} className={styles.categoriesOption}  value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <input
                        type='submit'
                        value='Crear cuenta'
                        disabled={
                            !errors.name &&
                                !errors.lastName &&
                                !errors.email &&
                                !errors.password &&
                                !errors.confirmpassword
                                ? false
                                : true
                        }
                        id={styles.submitBut}
                    />

            </form>
        </div>
    )
}

export default Register