import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./paginas/Inicio";
import Asesores from "./paginas/Asesores";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import Asesorias from "./paginas/Asesorias";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    //crear rutas
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/asesores" element={<Asesores />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/asesorias/:id" element={<Asesorias />}></Route>
        <Route path="/Registro" element={<Registro />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
