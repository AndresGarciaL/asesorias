import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../estilos/Encabezado.css";


function Encabezado() {
  const login = localStorage.getItem("usuario");
  const navegacion = useNavigate();

  const logout = () => {
    localStorage.clear();
    navegacion("/");
  };

  return (
    <header className="p-3 text-black-50 bg-turquesa">
      <div className="container-fluid w-75 p-3">
        <div className="row align-items-end">
          <div className="col-3">
            <Link to="/" className="text-white text-decoration-none">
              <img
                src={require("../imagenes/logo-pia.png")}
                className="logo"
                alt="Logo PIA"
              />
              <br />
              <span>Plataforma Integral de Asesorías</span>
            </Link>
          </div>
          <nav className="col text-center">
            <ul className="nav">
              <li>
                <Link to="/" className="nav-link px-2 text-white fs-5">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/asesores" className="nav-link px-2 text-white fs-5">
                  Asesores
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link px-2 text-white fs-5">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link px-2 text-white fs-5">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
          <div className="col-2 text-end align-middle">
           
 {login ? (
              <>
               <Link to="/Registro" type="button" className="register btn btn-outline-dark">
                    Registro
                  </Link>
                <button
                  type="button"
                  className="btn bg-marino text-white btn-cerrar-sesion"
                  onClick={logout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/Login" className="btn btn-outline-light me-2">
                  Acceso
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Encabezado;
