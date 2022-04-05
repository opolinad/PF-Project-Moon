import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { Toast } from "../../helpers/alerts/alert";
import { loginUser } from "../../redux/apiCalls/loginCall";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    console.log("handleSubmit");
    console.log(user);
    e.preventDefault();
    if (input.email === "" || input.password === "") {
      Toast.fire({
        icon: "info",
        title: "invalid credentials",
      });
      setInput({ email: "", password: "" });
    } else {
      loginUser(dispatch, input);
    }
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

  useEffect(() => {
    (() => {
      user.currentUser &&
        Toast.fire({
          icon: "success",
          title: "Login success",
        });
      user.currentUser && navigate("/");
    })();
  }, [user.currentUser]);

  useEffect(() => {
    (() => {
      user.error &&
        Toast.fire({
          icon: "info",
          title: "invalid credentials",
        });
      user.error && setInput({ email: "", password: "" });
    })();
  }, [user.error]);

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              type="email"
              placeholder="email"
              name="email"
              value={input.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={(e) => handleChange(e)}
            required
          />
          <button type="submit" className="btn">
            Login
          </button>
          <p className="message">
            Not registered yet?<a href=""> Sign in </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
