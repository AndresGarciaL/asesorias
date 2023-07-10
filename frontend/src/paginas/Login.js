import "../estilos/Login.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

  const [campos, setCampos] = useState({
    correo_electronico:"",
    contrasenia:""
  });
  const navegacion = useNavigate()
  const [error, setError] = useState('');

  function checaEmail(valor) {
    if(valor.includes('')){
      setCampos({ ...campos, correo_electronico: valor })
    }
  }

  const autenticar = (event) => {
    event.preventDefault(); //previene que la pagina se este recargando al enviar el formulario
    axios.post('http://localhost:8082/login', campos)
      .then(respuesta => {
        if (respuesta.data.Estatus === 'Correcto') {
          localStorage.setItem('usuario',respuesta.data);
          navegacion('/');
        } else {
          setError(respuesta.data.error);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <section>
        <div id="img">
          <Link to="/">
            <img src={require("../imagenes/logo-pia.png")} className="logo-form" alt="Logo" />
          </Link>
        </div>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit = {autenticar}>
              <h2>Login</h2>
              <div className="inputbox">
                <input onChange={e => checaEmail(e.target.value)} name="correo_electronico" type='email' />
                <label>Email</label>
              </div>
              <div className="inputbox">
                <input onChange={e => setCampos({ ...campos, contrasenia: e.target.value })} name="contrasenia" type='password' />
                <label>Contraseña</label>
              </div>
              <button type='submit'>Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
