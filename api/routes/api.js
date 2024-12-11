const express = require('express');
const session = require('express-session');
const api = express.Router();
const mssql = require('mssql');
const bcrypt = require('bcryptjs');

const app = express();

const SysConn = require("../server/connection");

api.get('/health-check', (req, res) => {
    res.status(200).json({ message: 'Conexión exitosa con el backend.' });
});

api.post('/agregarReporte', async (req, res) => {
  const procedureName = 'InsertReporte';

  const {
    nombreReporte,
    fechaCreacion,
    ultimaModificacion,
    tipoMantenimiento,
    ModeloID,
    responsable,
    horaInicio,
    horaTermino,
    licencia,
    registro,
    restaurador,
    CircuitoID,
    area,
    latitud,
    longitud,
    direccion,
    nsRadioGabinete,
    potenciaSalida,
    rss1,
    umbralRecepcion,
    frecuenciaID,
    rx,
    tx,
    CablePigtailID,
    SupresorID,
    CableLTID,
    AntenaID,
    alturaAntena,
    RepetidorEnlaceID,
    CanalUCMID,
    fotografiasMantto,
    medicionRF,
    medicionFuenteCD,
    medicionBateria,
    limpieza,
    ajusteTornilleria,
    cambioAntena,
    impermeabilizacionConectores,
    redireccionamientoAntena,
    cambioLT,
    cambioSupresor,
    cambioRadio,
    cambioPigtail,
    cambioConectores,
    potenciaRadio,
    potenciaIncidente,
    potenciaReflejada,
    vswr,
    voltajeAcometida,
    resistenciaTierra,
    voltajeFuente,
    voltajeBateria,
    resitenciaBateria,
    porcentajeBateria,
    anguloAzimut,
    placaNomeclatura,
    selladoGabinete,
    protectorAntifauna,
    cuchillaByPass,
    cuchillaLaterale,
    bajanteTierra,
    terminalPAT,
    apartarrayos,
    cableRF,
    calibreBajante,
    Observaciones,
    configuracionRadio,
    imagenEstructura,
    imagenGabinete,
    imagenRadio,
    imagenSupresor,
    imagenRestaurador,
    imagenTerminalTierra,
    imagenBajanteTierra,
    imagenPlaca,
    imagenAdicional
  } = req.body;

  try {
    const request = SysConn.request();
    
    request.input('nombreReporte', mssql.NVarChar, nombreReporte);
    request.input('fechaCreacion', mssql.Date, fechaCreacion);
    request.input('ultimaModificacion', mssql.Date, ultimaModificacion);
    request.input('tipoMantenimiento', mssql.NVarChar, tipoMantenimiento);
    request.input('ModeloID', mssql.Int, ModeloID);
    request.input('responsable', mssql.Int, responsable);
    request.input('horaInicio', mssql.NVarChar, horaInicio);
    request.input('horaTermino', mssql.NVarChar, horaTermino);
    request.input('licencia', mssql.NVarChar, licencia);
    request.input('registro', mssql.NVarChar, registro);
    request.input('restaurador', mssql.NVarChar, restaurador);
    request.input('CircuitoID', mssql.Int, CircuitoID);
    request.input('area', mssql.NVarChar, area);
    request.input('latitud', mssql.NVarChar, latitud);
    request.input('longitud', mssql.NVarChar, longitud);
    request.input('direccion', mssql.NVarChar, direccion);
    request.input('nsRadioGabinete', mssql.NVarChar, nsRadioGabinete);
    request.input('potenciaSalida', mssql.NVarChar, potenciaSalida);
    request.input('rss1', mssql.NVarChar, rss1);
    request.input('umbralRecepcion', mssql.NVarChar, umbralRecepcion);
    request.input('frecuenciaID', mssql.Int, frecuenciaID);
    request.input('rx', mssql.NVarChar, rx);
    request.input('tx', mssql.NVarChar, tx);
    request.input('CablePigtailID', mssql.Int, CablePigtailID);
    request.input('SupresorID', mssql.Int, SupresorID);
    request.input('CableLTID', mssql.Int, CableLTID);
    request.input('AntenaID', mssql.Int, AntenaID);
    request.input('alturaAntena', mssql.VarChar, alturaAntena);
    request.input('RepetidorEnlaceID', mssql.Int, RepetidorEnlaceID);
    request.input('CanalUCMID', mssql.Int, CanalUCMID);
    request.input('fotografiasMantto', mssql.Bit, fotografiasMantto);
    request.input('medicionRF', mssql.Bit, medicionRF);
    request.input('medicionFuenteCD', mssql.Bit, medicionFuenteCD);
    request.input('medicionBateria', mssql.Bit, medicionBateria);
    request.input('limpieza', mssql.Bit, limpieza);
    request.input('ajusteTornilleria', mssql.Bit, ajusteTornilleria);
    request.input('cambioAntena', mssql.Bit, cambioAntena);
    request.input('impermeabilizacionConectores', mssql.Bit, impermeabilizacionConectores);
    request.input('redireccionamientoAntena', mssql.Bit, redireccionamientoAntena);
    request.input('cambioLT', mssql.Bit, cambioLT);
    request.input('cambioSupresor', mssql.Bit, cambioSupresor);
    request.input('cambioRadio', mssql.Bit, cambioRadio);
    request.input('cambioPigtail', mssql.Bit, cambioPigtail);
    request.input('cambioConectores', mssql.Bit, cambioConectores);
    request.input('potenciaRadio', mssql.NVarChar, potenciaRadio);
    request.input('potenciaIncidente', mssql.NVarChar, potenciaIncidente);
    request.input('potenciaReflejada', mssql.NVarChar, potenciaReflejada);
    request.input('vswr', mssql.VarChar, vswr);
    request.input('voltajeAcometida', mssql.NVarChar, voltajeAcometida);
    request.input('resistenciaTierra', mssql.NVarChar, resistenciaTierra);
    request.input('voltajeFuente', mssql.NVarChar, voltajeFuente);
    request.input('voltajeBateria', mssql.NVarChar, voltajeBateria);
    request.input('resitenciaBateria', mssql.NVarChar, resitenciaBateria);
    request.input('porcentajeBateria', mssql.NVarChar, porcentajeBateria);
    request.input('anguloAzimut', mssql.NVarChar, anguloAzimut);
    request.input('placaNomeclatura', mssql.Bit, placaNomeclatura);
    request.input('selladoGabinete', mssql.Bit, selladoGabinete);
    request.input('protectorAntifauna', mssql.Bit, protectorAntifauna);
    request.input('cuchillaByPass', mssql.Bit, cuchillaByPass);
    request.input('cuchillaLaterale', mssql.Bit, cuchillaLaterale);
    request.input('bajanteTierra', mssql.Bit, bajanteTierra);
    request.input('terminalPAT', mssql.Bit, terminalPAT);
    request.input('apartarrayos', mssql.Bit, apartarrayos);
    request.input('cableRF', mssql.Bit, cableRF);
    request.input('calibreBajante', mssql.NVarChar, calibreBajante);
    request.input('Observaciones', mssql.NVarChar, Observaciones);
    request.input('configuracionRadio', mssql.NVarChar, configuracionRadio);
    request.input('imagenEstructura', mssql.NVarChar, imagenEstructura);
    request.input('imagenGabinete', mssql.NVarChar, imagenGabinete);
    request.input('imagenRadio', mssql.NVarChar, imagenRadio);
    request.input('imagenSupresor', mssql.NVarChar, imagenSupresor);
    request.input('imagenRestaurador', mssql.NVarChar, imagenRestaurador);
    request.input('imagenTerminalTierra', mssql.NVarChar, imagenTerminalTierra);
    request.input('imagenBajanteTierra', mssql.NVarChar, imagenBajanteTierra);
    request.input('imagenPlaca', mssql.NVarChar, imagenPlaca);
    request.input('imagenAdicional', mssql.NVarChar, imagenAdicional);

    const results = await request.execute(procedureName);

    res.json({ message: 'Reporte agregado exitosamente', results });
  } catch (error) {
    console.error('Error al ejecutar el Store Procedure:', error);
    res.status(500).json({ error: 'Error al ejecutar el Store Procedure' });
  }
});

/*-----------------------------------------------------
    End Points by Carlos
-------------------------------------------------------*/

api.post('/AgregarUsuario', async(req, res) =>{
  const procedureName= 'AddUser';
  const {numeroTrabajador, nombre, password, tipoUsuario} = req.body;

  try {
    if (!numeroTrabajador || !nombre || !password || !tipoUsuario) {
      return res.status(400).json({message: 'Todos los campos son obligatorios'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const request = SysConn.request();

    request.input('numeroTrabajador', mssql.VarChar, numeroTrabajador);
    request.input('nombre', mssql.VarChar, nombre);
    request.input('password', mssql.VarChar, hashedPassword); 
    request.input('tipoUsuario', mssql.Int, tipoUsuario);
    
    await request.execute(procedureName);

    res.json({message: 'Usuario agregado correctamente'});
  } catch (error) {
    console.error('Error al ejecutar el Store Procedure:', error);
    res.status(500).json({ error: 'Error al ejecutar el Store Procedure' });
  }
});

api.post('/ObtenerUsuario', async(req, res) =>{
  const {idTrabajador} = req.body;

  try {
    const request = SysConn.request();
    request.input('idTrabajador', mssql.Int, idTrabajador);

    const result = await request.execute('GetUserById');

    if(result.recordset.length === 0){
      return res.status(404).json({message: 'Usuario no encontrado'});
    }

    res.json(result.recordset[0]);
    
  } catch (error) {
    
    console.error('Error al obtener datos del usuario: ',error);
    res.status(500).json({error: 'Error al obtener los datos del usuario'});
  }
});  
  
api.post('/ActualizarUsuario', async (req, res) => {
  const procedureName= 'UserUpdate';
  const { idTrabajador, numeroTrabajador, nombre, password, tipoUsuario } = req.body;
  
  try {
    const request = SysConn.request();
  
    request.input('idTrabajador', mssql.Int, idTrabajador);
    request.input('numeroTrabajador', mssql.VarChar, numeroTrabajador);
    request.input('nombre', mssql.VarChar, nombre);
    request.input('password', mssql.VarChar, password);
    request.input('tipoUsuario', mssql.Int, tipoUsuario);
  
    await request.execute(procedureName);
    res.json({message: 'Usuario actualizado exitosamente'});
  } catch (error) {
    console.error('Error al ejecutar el Store Procedure:', error);
    res.status(500).json({ error: 'Error al ejecutar el Store Procedure' });
  }
});
  
api.post('/eliminarUsuario', async (req, res) => {
  const { idTrabajador } = req.body; // Obtenemos el idTrabajador del cuerpo de la solicitud
  const procedureName = 'DeleteUser';
  const request = SysConn.request();

  try {
      // Asignar el parámetro al procedimiento almacenado
      request.input('idTrabajador', mssql.Int, idTrabajador);

      // Ejecutar el procedimiento almacenado
      await request.execute(procedureName);

      // Respuesta exitosa
      res.json({ message: `Usuario con ID ${idTrabajador} eliminado correctamente` });
      console.log(`Usuario con ID ${idTrabajador} eliminado correctamente`);
  } catch (error) {
      console.error('Error al ejecutar el procedimiento almacenado:', error);

      // Manejar error genérico
      res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

/*-----------------------------------------------------
    Propuesta de Log in
-------------------------------------------------------*/

app.use(express.json()); // Middleware para parsear JSON

// Configuración de sesión
app.use(session({
  secret: 'mi_secreto_seguro', // Cambiar por un secreto único
  resave: false,              // No guardar la sesión si no hay cambios
  saveUninitialized: false,   // No guardar sesiones vacías
  cookie: { maxAge: 8 * 60 * 60 * 1000 } // Sesión válida por 8 horas
}));

app.post('/login', async (req, res) => {
  const { numeroTrabajador, password } = req.body;

  try {
    if (!numeroTrabajador || !password) {
      return res.status(400).json({ message: 'Número de trabajador y contraseña son obligatorios' });
    }

    // Crear una solicitud a la base de datos
    const request = SysConn.request();
    request.input('numeroTrabajador', mssql.VarChar, numeroTrabajador);

    // Ejecutar el procedimiento almacenado
    const result = await request.execute('GetUserByNumeroTrabajador');
    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Guardar el ID del usuario en la sesión
    req.session.idTrabajador = usuario.idTrabajador;

    res.json({ message: 'Inicio de sesión exitoso', user: { nombre: usuario.nombre, tipoUsuario: usuario.tipoUsuario } });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


/*-----------------------------------------------------
    Cambiar contraseña
-------------------------------------------------------*/

app.put('/CambiarPassword', async (req, res) => {
  const { passwordActual, nuevaPassword } = req.body;

  try {
    if (!passwordActual || !nuevaPassword) {
      return res.status(400).json({ message: 'Contraseña actual y nueva contraseña son obligatorias' });
    }

    // Verificar que el usuario esté autenticado
    if (!req.session.idTrabajador) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const idTrabajador = req.session.idTrabajador;

    // Obtener la contraseña actual de la base de datos
    const request = SysConn.request();
    request.input('IdTrabajador', mssql.Int, idTrabajador);

    const result = await request.query('SELECT password FROM Usuarios WHERE idTrabajador = @IdTrabajador');
    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar que la contraseña actual coincida
    const passwordValida = await bcrypt.compare(passwordActual, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ message: 'La contraseña actual no es correcta' });
    }

    // Encriptar la nueva contraseña y actualizarla en la base de datos
    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
    request.input('NuevaPassword', mssql.VarChar, hashedPassword);

    await request.execute('UpdateUserPassword'); // Procedimiento almacenado para actualizar la contraseña

    res.json({ message: 'Contraseña cambiada correctamente' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

api.post('/iniciarSesion', async (req, res) => {
  const { numeroTrabajador, password } = req.body;
  const procedureName = 'iniciarSesion'; 
  const request = SysConn.request();

  try {
      // Asignar parámetros al procedimiento almacenado
      request.input('p_numeroTrabajador', mssql.NVarChar(50), numeroTrabajador);

      // Ejecutar el procedimiento almacenado (solo pasa numeroTrabajador)
      const results = await request.execute(procedureName);

      if (results && results.recordset && results.recordset.length > 0) {
          const user = results.recordset[0];

          // Comparar la contraseña ingresada con el hash almacenado
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) {
              res.json({
                  idTrabajador: user.idTrabajador,
                  numeroTrabajador: user.numeroTrabajador,
                  nombre: user.nombre,
                  tipoUsuario: user.tipoUsuario,
              });
              console.log(`Inicio de sesión exitoso para ${numeroTrabajador}`);
          } else {
              res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
          }
      } else {
          res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }
  } catch (error) {
      console.error('Error al ejecutar el procedimiento almacenado:', error);
      res.status(500).json({ error: 'Error al ejecutar el procedimiento almacenado' });
  }
});

module.exports = api;