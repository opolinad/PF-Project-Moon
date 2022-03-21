import React, { useState, useEffect } from "react";

export default function UserEdit() {
  const [error, setError] = useState({});

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Usuario editado");
    setInputs({
      email: "",
      password: "",
    });

    return (
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Email: </label>
            <input
              name="email"
              type="text"
              value={inputs.email}
              placeholder="email"
              onChange={handleInputChange}
            />
            {error.name && <span>{error.name}</span>}
          </div>
          <div>
            <label>Password: </label>
            <input
              name="password"
              type="text"
              value={inputs.password}
              placeholder="password"
              onChange={handleInputChange}
            />
            {error.hp && <span>{error.hp}</span>}
          </div>
        </form>
      </div>
    );
  }
}
