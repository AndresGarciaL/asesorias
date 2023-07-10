import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Asesoria() {
  const [asesorias, setAsesorias] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8082/asesorias/${id}`)
      .then(respuesta => {
        if (respuesta.data.Estatus === 'Correcto') {
          setAsesorias(respuesta.data.Resultado);
        } else {
          console.log('Error');
        }
      })
      .catch(error => {
        console.log('Error', error);
      });
  }, [id]);

  return (
    <>
      <h3>Lista de la División</h3>
      <div className="row">
        {asesorias.map(asesoria => (
          <div className="col-md-4 mb-3 d-flex justify-content-center" key={asesoria.division}>
            <div className="card d-flex flex-direction-column align-items-center">
              <img src={require("../imagenes/tecnologia.jpeg")} className="card-img-top" alt="..." />
              <div className="card-body ">
                <h5 className="card-title">{asesoria.nombre_asesoria}</h5>
                <h6 className="card-title">Asesor: {asesoria.nombre_usuario} {asesoria.apellidos_usuario}</h6>
                <p className='card-text'>{asesoria.descripcion}</p>
                <p className='card-text'>Horario: {asesoria.horario}</p>
                <p className='card-text'>Area: {asesoria.nombre_categoria}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Asesoria;
