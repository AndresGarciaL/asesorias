import "../estilos/Registro.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Encabezado from "../componentes/Encabezado";


function Registro() {
  const navegacion = useNavigate();
  const [campos, setCampos] = useState({
    nombre_usuario: "",
    apellidos_usuario: "",
    correo_electronico: "",
    contrasenia: ""
  });

  const autenticar = (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const { nombre_usuario, apellidos_usuario, correo_electronico, contrasenia } = campos;

    // Crear el objeto de datos a enviar
    const datos = {
      nombre_usuario,
      apellidos_usuario,
      correo_electronico,
      contrasenia
    };

    axios.post('http://localhost:8082/register', datos)
      .then(respuesta => {
        if (respuesta.data.Estatus === 'Correcto') {
          localStorage.setItem('usuario', JSON.stringify(respuesta.data)); // Corregido el formato de JSON.stringify()
          navegacion('/');
        } else {
          console.log(respuesta.data.Error);
        }
      })
      .catch(error => console.log(error));
  };

  function actualizarCampo(event) {
    const { name, value } = event.target;
    setCampos({ ...campos, [name]: value });
  }

  return (
    <>
    <Encabezado/>
      <section>
        <div id="img"></div>
        <h1>DASH BOARD</h1>
        <div className="form-box">
       
          <div className="form-value">
          
            <form onSubmit={autenticar}>
             
              <h3>Registro de Asesores</h3>
              <div className="inputbox">
                <input name="nombre_usuario" type='text' onChange={actualizarCampo} />
                <label>Nombre</label>
              </div>

              <div className="inputbox">
                <input name="apellidos_usuario" type='text' onChange={actualizarCampo} />
                <label>Apellidos</label>
              </div>

              <div className="inputbox">
                <input name="correo_electronico" type='email' onChange={actualizarCampo} />
                <label>Email</label>
              </div>

              <div className="inputbox">
                <input name="contrasenia" type='password' onChange={actualizarCampo} />
                <label>Contraseña</label>
              </div>
              <button className="btn-register" type='submit'>Registrar</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Registro;
