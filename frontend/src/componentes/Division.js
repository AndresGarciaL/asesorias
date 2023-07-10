import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Division() {
  const [divisiones, setDivisiones] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/obtenerDivisiones').then((respuesta) => {
      if (respuesta.data.Estatus === 'Correcto') {
        setDivisiones(respuesta.data.Resultado);
      } else {
        console.log('Error');
      }
    });
  }, []);

  return (
    <>
      <h3>Lista de divisiones de la universidad</h3>
      <div className="row">
        {divisiones.map((division, index) => (
          <div className="col-md-4 mb-3 d-flex justify-content-center" key={division.id_division}>
            <div className="card">
              <img src={require('../imagenes/tecnologia.jpeg')} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{division.nombre_division}</h5>
                <p className="card-text">{division.descripcion}</p>
                <Link to={'/asesorias/' + division.id_division} className="btn btn-primary">
                  Go somewhere
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Division;

