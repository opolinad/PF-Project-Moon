import React, {useState} from 'react';
import { Link } from 'react-router-dom'

export default function LandingPage(){
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    function handleSubmit(e){
        e.preventDefault();
    }
    
    function handleChange(e){
        console.log(e.target.value)
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    return(
        <div>
            <div>
                <img src="" alt="logo not found" />
                <h1>MOON PROTOCOL</h1>
                <p>The passion of design in one place, we will make it to the moon</p>
            </div>
            <form>
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
        </div>
    )
}