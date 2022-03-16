<h1>EDPOINT UPDATE DE USUARIO</h1>

<h3>Se envia el id por <strong>params</strong> </h3>
<h3>Path: `http://localhost:3001/api/user/${id}` </h3>
<br/>
<p>Model de datos de usuario para modificar <p>

    {
        email?: string;
        password?: string;
        username?: string;
        image?: string;
    }

<br/>
<h5>Request por <strong>headers</strong> </h5>
<p>Se debe enviar por header el accessToken del usuario para realizar modificaciones en el mismo</p>

    {
        headers: {
            token: "token del usuario"
        }
    }

<img src='../assets/accessToken.jpg' alt='accessToken' />

<br/>
<h5>Method: <strong>PUT</strong> </h5>
<h5>Request por <strong>BODY</strong> </h5>
<p>Se debe enviar aunque sea uno de los datos a modificar por body</p>
<img src='../assets/userData.jpg' alt='userData' />
<br/>

<br/>
<h5><strong>RESPONSE</strong></h5>
<img src='../assets/updateUser.jpg' alt='updateUser' />
