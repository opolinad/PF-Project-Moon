import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {postNewUser, getCategories} from "../redux/actions/Register.js"

//validacion de errores
function validar(input){
    let errors = {}
    
    if(!input.email){
        errors.email = "Debe ingresar un email"
    } else if(!/\S+@\S+\.\S+/.test(input.email)){
        errors.email = "El email debe ser valido"
    }

    if (!input.password) {
        errors.password = 'Debe ingresar una contraseña'
    }   else if (input.password.trim().length < 8) {
        errors.password = 'Debe tener mínimo 8 caracteres'
    }   else if (!/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(input.password)) 
    {   errors.password = 'Debe tener una mayúscula, una minúscula y un dígito'
    }

    if (!input.confirmpassword) {
    errors.confirmpassword = 'Confirme su contraseña'
    } else if (input.password !== input.confirmpassword) {
    errors.confirmpassword = 'Las contraseñas no coinciden'
    }

    return errors
}



export default function FormUser(){
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        categories: []
    })

    useEffect(() => {
        dispatch(getCategories())
      }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input, 
            [e.target.name]: e.target.value,
        })

        setErrors(
            validar({
                ...input,
                [e.target.name] : e.target.value
            })
        )
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postNewUser(input))
        setInput({
            email: "",
            password: "",
            confirmpassword: "",
            categories: []
        })
    }
    console.log(input)

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
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
                    <div>
                        <label>Correo electrónico:</label>
                        <input onChange={e => handleChange(e)} type="email" name="email" value={input.email}/>
                        {errors.email && (
                        <span className='error'>
                            <small>{errors.email}</small>
                        </span>
                        )}
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input onChange={e => handleChange(e)} type="password" name="password" value={input.password}/>
                        {errors.password && (
                        <span className='error'>
                            <small>{errors.password}</small>
                        </span>
                        )}
                    </div>
                    <div>
                        <label>Repetir contraseña:</label>
                        <input onChange={e => handleChange(e)} type="password" name="confirmpassword" value={input.confirmpassword}/>
                        {errors.confirmpassword && (
                        <span className='error'>
                            <small>{errors.confirmpassword}</small>
                        </span>
                        )}
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
                    />
                    <div>
                        <label>
                            Categories:
                        </label>
                        <select
                            id='categories'
                            name='categories'
                            onChange={(e) => handleSelect(e)}
                            required
                        >
                        <option value='categories'>Categories...</option>
                            {categories.map((c) => (
                                <option value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )

}