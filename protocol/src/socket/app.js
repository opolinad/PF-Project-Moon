import React, { useState } from "react";
import Chat from "./chat";
import socket from "./socket";

export default function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <div>
      {!registrado && (
        <form onSubmit={registrar}>
          <label htmlFor="">Introduzca su nombre</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <button>Ir al chat</button>
        </form>
      )}

      {registrado && <Chat nombre={nombre} />}
    </div>
  );
}
