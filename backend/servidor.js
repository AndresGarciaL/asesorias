import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt  from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';

//* 2.-CREAMOS LA INSTANCIA DE EXPRESS
const app= express();
app.use(express.json())
app.use(cors());

//* 3.- CREAMOS LA CONEXION A LA BASE DE DATOS
const conexion=mysql.createConnection({
    server: 'localhost',
    user: 'root',
    password: "",
    database:"asesorias"
});

//* 4.-VERIFICAMOS LA CONEXION
conexion.connect(function (error){
    if (error){
        console.log("No fue posible la conexion");
    }
    else {
        console.log("Conexion con el servidor EXITOSA");
    }
});




// * 6- OBTENER LA LISTA DE DIVISIONES DE LA UNI
app.get("/obtenerDivisiones",(peticion, respuesta)=>{
//* 6.1 CONSULTA SQL
const sql="SELECT * FROM divisiones WHERE estatus=1";
//* 6.2 LO ENVIO A LA CONEXION
conexion.query(sql,(error,resultado)=>{
    //* 6.3 COMPRUEBO EL RESULTADO
    if(error) return respuesta.json({Error: "Error en la consulta"});
    return respuesta.json({Estatus:"Correcto",Resultado:resultado});
});

});

//* 7. OBTENER LAS ASESORIAS DE ACUERDO A LA DIVISION
app.get('/asesorias/:id', (peticion, respuesta) => {
    const id = peticion.params.id;
    const sql = `SELECT a.*, c.nombre_categoria, u.nombre_usuario, u.apellidos_usuario 
                 FROM asesorias a 
                 JOIN categorias c ON a.categoria = c.id_categoria 
                 JOIN usuarios u ON a.asesor = u.id_usuario 
                 WHERE a.division = ?`;
    conexion.query(sql, [id], (error, resultado) => {
      if (error) {
        return respuesta.json({ Error: "Error en la consulta" });
      }
      return respuesta.json({ Estatus: "Correcto", Resultado: resultado });
    });
  });
  
  //* LOGIN
  app.post('/login', (peticion, respuesta) => {
    const sql = "SELECT * FROM usuarios WHERE correo_electronico = ? AND contrasenia = ?";
    conexion.query(sql, [peticion.body.correo_electronico, peticion.body.contrasenia], (error, resultado) => {
      if (error) {
        return respuesta.json({ Error: "Error en la consulta" });
      }
      if (resultado.length > 0) {
        const usuario = resultado[0];
        const token = jwt.sign({ usuario: usuario.tipo_usuario }, "miclavesecreta", { expiresIn: '1d' });
        console.log(usuario.tipo_usuario);
        respuesta.cookie('token', token); // Guarda el token en una cookie
        return respuesta.json({ Estatus: "Correcto", Usuario: token });
      } else {
        return respuesta.json({ Estatus: "Error", Error: "Usuario o Contraseña Incorrecto" });
      }
    });
  });
  
  

  //*  REGISTER
  app.post('/register', (peticion, respuesta) => {
    const sql ="INSERT INTO usuarios (nombre_usuario, apellidos_usuario, correo_electronico, contrasenia, tipo_usuario, estatus) VALUES (?,?,?,sha1(?),?,?)";
    conexion.query(sql, [peticion.body.nombre_usuario,peticion.body.apellidos_usuario,peticion.body.correo_electronico, peticion.body.contrasenia, 2, 1],
        (error,resultado)=>{
        if(error){
            console.log(error);
            return respuesta.json({Error: "Error en el REGISTRO"});
        }
        return respuesta.json({Estatus: "Correcto"});
    });
  });

//* 5.-INICIAMOS EL SERVIDOR
app.listen(8082,()=>{
    console.log("Servidor INICIADO..");
});


// FUNCIONES DEL PROTOCOLO HTTP
// GET  OBTENER DEL SERVIDOR
// POST PARA ENVIAR INFORMACION
// PUT  
// PATCH  MODIFICAR INFORMACION EN  MI SERVIDOR
// DELETE ELIMINAR INFORMACION EN MI SERVIDOR