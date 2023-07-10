import React from "react";
import Encabezado from "../componentes/Encabezado";
import Asesoria from "../componentes/Asesoria";
function Asesorias(){
    return (
        <>
        <Encabezado/>
        <div className="container">
        <Asesoria/> 
        </div>
        </>
    );
}

//3.- exportamos
export default Asesorias;