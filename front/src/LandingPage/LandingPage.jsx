import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { postUser } from '../redux/LandingPage/LandingPage'
// import CookiesPolicy from '../CookiesPolicy/CookiesPolicy';

function validate(input){
    let errors = {}

    if(!input.email){
        errors.email = "Debe ingresar un email"
    } else if(!/\S+@\S+\.\S+/.test(input.email)){
        errors.email = "El email debe ser valido"
    }

    if (!input.password) {
        errors.password = 'Debe ingresar una contraseña'
    }   

return errors
}

export default function LandingPage(){
    const dispatch = useDispatch()
    // const history = useHistory()
    // const users = useSelector((state) => state.users)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    // useEffect(() => {
    //     dispatch(getUsers())
    // }, [dispatch])

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postUser(input))
    }
    
    function handleChange(e){
        console.log(e.target.value)
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
          }))
    }

    return(
        <div>
            <div>
                <img src="" alt="logo not found" />
                <h1>MOON PROTOCOL</h1>
                <p>The passion of design in one place, we will make it to the moon</p>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder='email' name= 'email' value={input.email} onChange={(e) => handleChange(e)}/>
                <input type="text" placeholder='password' name= 'password' value={input.password} onChange={(e) => handleChange(e)}/>
                <Link to={"/login"}>
                    <button>log in</button>
                </Link>
                <Link to={"/password_reset"}>Forgot password?</Link>
                <Link to={"/register"}>
                    <button>create a new account</button>
                </Link>
                <p>Publish your illustrations and discover others!</p>
            </form>
            {/* <div id="cookies-policy">
            <h3>Cookies</h3>
            <p>Most mordern websites place small filles called "cookies" on your computer which improve your browsing experience and enable the website to function effectively.</p>    
            <button>OK</button>
            <Link to={CookiesPolicy}><button>Cookies policy</button></Link> 
            </div>*/}
        </div>
    )
}