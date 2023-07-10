import React from "react";
import Encabezado from "../componentes/Encabezado";
import Division from "../componentes/Division";
function Inicio(){
    return (
        <>
        <Encabezado/>
        <div className="container">
        <h1>Bienvenidos a PIA</h1> 
        <Division/> 
        </div>
        </>
    );
}

//3.- exportamos
export default Inicio;