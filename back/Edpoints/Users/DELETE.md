<h1>EDPOINT DELETE DE USUARIO</h1>

<h3>Se envia el id por <strong>params</strong> </h3>
<h3>Path: `http://localhost:3001/api/user/${id}` </h3>
<br/>

<h5>Request por <strong>headers</strong> </h5>
<p>Se debe enviar por header el accessToken del usuario para realizar el delete del usuario</p>

    {
        headers: {
            token: "token del usuario"
        }
    }

<img src='../assets/accessToken.jpg' alt='accessToken' />

<br/>
<h5>Method: <strong>DELETE</strong> </h5>

<br/>
<h5><strong>RESPONSE</strong></h5>
<img src='../assets/deleteUser.jpg' alt='deleteUser' />
