const express = require('express');
const api = express.Router();
const mssql = require('mssql');


const SysConn = require("../server/connection");

api.post('/detalle/usuario', async (req, res) => {
  // http://localhost:1433/api/detalle/usuario
  const procedureName = 'detalleUsuario';
  const { id } = req.body;

  try {
      const request = SysConn.request();
      request.input('Id', mssql.Int, id);

      const results = await request.execute(procedureName);

      if (results.recordset.length === 0) {
          console.log('ID recibido en el cuerpo de la solicitud:', id);
          res.status(404).json({ error: 'No se ha encontrado el usuario solicitado' });
      } else {
          const userDetails = results.recordset;
          res.json({ userDetails });
          console.log('Detalles del Usuario:', JSON.stringify(userDetails));
      }
  } catch (error) {
      console.error('Error al ejecutar el Store Procedure:', error);
      res.status(500).json({ error: 'Error al ejecutar el Store Procedure' });
  }
});

api.post('/agregarUsuario', async (req, res) => {
  const procedureName = 'agregarUsuarios';
  const { numeroTrabajador, nombre, password, tipoUsuario } = req.body;
  try{
    const request = SysConn.request();
    request.input('numeroTrabajador', mssql.VarChar, numeroTrabajador);
    request.input('nombre', mssql.VarChar, nombre);
    request.input('password', mssql.VarChar, password);
    request.input('tipoUsuario', mssql.Int, tipoUsuario);

    const results = await request.execute(procedureName);

    res.json({ message: 'Usuario agregado exitosamente', results });
    } catch (error) {
    console.error('Error al ejecutar el Store Procedure:', error);
    res.status(500).json({ error: 'Error al ejecutar el Store Procedure' });
    }

  });



module.exports = api;
