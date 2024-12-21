// routes/api.js

const express = require('express');
const api = express.Router();
const mssql = require('mssql');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const poolPromise = require('../server/connection'); // Importación correcta

dotenv.config();

// Función de utilidad para convertir valores a BIT (1 o 0)
function convertToBit(value) {
  if (typeof value === 'string') {
    return (value.toLowerCase() === 'true' || value === '1' || value.toLowerCase() === 'on') ? 1 : 0;
  }
  return value ? 1 : 0;
}

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    // Crear la carpeta 'uploads' si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Renombrar el archivo para evitar conflictos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Filtro para aceptar solo imágenes
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'));
  }
};

// Inicializar multer
const upload = multer({ 
  storage: storage, 
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limitar a 5MB por archivo
});

// Ruta para agregar reporte con manejo de imágenes
api.post('/agregarReporte', upload.fields([
  { name: 'imagenEstructura', maxCount: 1 },
  { name: 'imagenGabinete', maxCount: 1 },
  { name: 'imagenRadio', maxCount: 1 },
  { name: 'imagenSupresor', maxCount: 1 },
  { name: 'imagenRestaurador', maxCount: 1 },
  { name: 'imagenTerminalTierra', maxCount: 1 },
  { name: 'imagenBajanteTierra', maxCount: 1 },
  { name: 'imagenPlaca', maxCount: 1 },
  { name: 'imagenAdicional', maxCount: 1 },
]), async (req, res) => {
  const procedureName = 'sp_insertar_reporte';

  // Extraer los campos desde req.body
  const {
    tipoMantenimiento,
    modelo,
    fecha,
    horaInicio,
    horaTermino,
    responsable,
    licencia,
    registro,
    restaurador,
    circuito,
    area,
    ubicacionMapa,
    direccion,
    nsRadioGabinete,
    potenciaSalida,
    rssi,
    umbralRecepcion,
    frecuencia,
    rx,
    tx,
    cablePigtail,
    supresor,
    cableLT,
    alturaAntena,
    repetidorEnlace,
    canalUCM,
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
    resistenciaBateria,
    porcentajeBateria,
    anguloAzimut,
    placaNomeclatura, // Corregido de placaNomenclatura a placaNomeclatura
    selladoGabinete,
    protectorAntifauna,
    cuchillasByPass,
    cuchillasLaterale,
    bajanteTierra,
    terminalPAT,
    apartarrayos,
    cableRF,
    calibreBajante,
    Observaciones,
    configuracionRadio
  } = req.body;

  // Extraer las rutas de las imágenes subidas
  const {
    imagenEstructura,
    imagenGabinete,
    imagenRadio,
    imagenSupresor,
    imagenRestaurador,
    imagenTerminalTierra,
    imagenBajanteTierra,
    imagenPlaca,
    imagenAdicional
  } = req.files;

  // Convertir los valores de los checkboxes a BIT (1 o 0)
  const fotografiasManttoBit = convertToBit(fotografiasMantto);
  const medicionRFBit = convertToBit(medicionRF);
  const medicionFuenteCDBit = convertToBit(medicionFuenteCD);
  const medicionBateriaBit = convertToBit(medicionBateria);
  const limpiezaBit = convertToBit(limpieza);
  const ajusteTornilleriaBit = convertToBit(ajusteTornilleria);
  const cambioAntenaBit = convertToBit(cambioAntena);
  const impermeabilizacionConectoresBit = convertToBit(impermeabilizacionConectores);
  const redireccionamientoAntenaBit = convertToBit(redireccionamientoAntena);
  const cambioLTBit = convertToBit(cambioLT);
  const cambioSupresorBit = convertToBit(cambioSupresor);
  const cambioRadioBit = convertToBit(cambioRadio);
  const cambioPigtailBit = convertToBit(cambioPigtail);
  const cambioConectoresBit = convertToBit(cambioConectores);
  const placaNomeclaturaBit = convertToBit(placaNomeclatura);
  const selladoGabineteBit = convertToBit(selladoGabinete);
  const protectorAntifaunaBit = convertToBit(protectorAntifauna);
  const cuchillasByPassBit = convertToBit(cuchillasByPass);
  const cuchillasLateraleBit = convertToBit(cuchillasLaterale);
  const bajanteTierraBit = convertToBit(bajanteTierra);
  const terminalPATBit = convertToBit(terminalPAT);
  const apartarrayosBit = convertToBit(apartarrayos);
  const cableRFBit = convertToBit(cableRF);

  try {
    const pool = await poolPromise; // Esperar a que la conexión se establezca
    const request = pool.request();

    // Asignar parámetros (asegúrate de que los nombres y tipos coincidan con tu SP)
    request.input('tipoMantenimiento', mssql.NVarChar(50), tipoMantenimiento);
    request.input('modelo', mssql.NVarChar(100), modelo);
    request.input('fecha', mssql.Date, fecha);
    request.input('horaInicio', mssql.NVarChar(20), horaInicio);
    request.input('horaTermino', mssql.NVarChar(20), horaTermino);
    request.input('responsable', mssql.NVarChar(100), responsable);
    request.input('licencia', mssql.NVarChar(20), licencia);
    request.input('registro', mssql.NVarChar(20), registro);
    request.input('restaurador', mssql.NVarChar(20), restaurador);
    request.input('circuito', mssql.NVarChar(100), circuito);
    request.input('area', mssql.NVarChar(100), area);
    request.input('ubicacionMapa', mssql.NVarChar(150), JSON.stringify(ubicacionMapa));
    request.input('direccion', mssql.NVarChar(150), direccion);
    request.input('nsRadioGabinete', mssql.NVarChar(100), nsRadioGabinete);
    request.input('potenciaSalida', mssql.NVarChar(100), potenciaSalida);
    request.input('rssi', mssql.NVarChar(10), String(rssi));
    request.input('umbralRecepcion', mssql.NVarChar(10), String(umbralRecepcion));
    request.input('frecuencia', mssql.NVarChar(100), frecuencia);
    request.input('rx', mssql.NVarChar(50), rx);
    request.input('tx', mssql.NVarChar(50), tx);
    request.input('CablePigtail', mssql.NVarChar(100), cablePigtail);
    request.input('Supresor', mssql.NVarChar(100), supresor);
    request.input('CableLT', mssql.NVarChar(100), cableLT);
    request.input('Antena', mssql.NVarChar(100), ''); // si no la utilizas
    request.input('alturaAntena', mssql.NVarChar(50), alturaAntena);
    request.input('RepetidorEnlace', mssql.NVarChar(100), repetidorEnlace);
    request.input('CanalUCM', mssql.NVarChar(100), canalUCM);

    // Asignar los checkboxes convertidos a BIT
    request.input('fotografiasMantto', mssql.Bit, fotografiasManttoBit);
    request.input('medicionRF', mssql.Bit, medicionRFBit);
    request.input('medicionFuenteCD', mssql.Bit, medicionFuenteCDBit);
    request.input('medicionBateria', mssql.Bit, medicionBateriaBit);
    request.input('limpieza', mssql.Bit, limpiezaBit);
    request.input('ajusteTornilleria', mssql.Bit, ajusteTornilleriaBit);
    request.input('cambioAntena', mssql.Bit, cambioAntenaBit);
    request.input('impermeabilizacionConectores', mssql.Bit, impermeabilizacionConectoresBit);
    request.input('redireccionamientoAntena', mssql.Bit, redireccionamientoAntenaBit);
    request.input('cambioLT', mssql.Bit, cambioLTBit);
    request.input('cambioSupresor', mssql.Bit, cambioSupresorBit);
    request.input('cambioRadio', mssql.Bit, cambioRadioBit);
    request.input('cambioPigtail', mssql.Bit, cambioPigtailBit);
    request.input('cambioConectores', mssql.Bit, cambioConectoresBit);
    request.input('placaNomeclatura', mssql.Bit, placaNomeclaturaBit);
    request.input('selladoGabinete', mssql.Bit, selladoGabineteBit);
    request.input('protectorAntifauna', mssql.Bit, protectorAntifaunaBit);
    request.input('cuchillaByPass', mssql.Bit, cuchillasByPassBit);
    request.input('cuchillaLaterale', mssql.Bit, cuchillasLateraleBit);
    request.input('bajanteTierra', mssql.Bit, bajanteTierraBit);
    request.input('terminalPAT', mssql.Bit, terminalPATBit);
    request.input('apartarrayos', mssql.Bit, apartarrayosBit);
    request.input('cableRF', mssql.Bit, cableRFBit);

    request.input('potenciaRadio', mssql.NVarChar(50), potenciaRadio);
    request.input('potenciaIncidente', mssql.NVarChar(50), potenciaIncidente);
    request.input('potenciaReflejada', mssql.NVarChar(50), potenciaReflejada);
    request.input('vswr', mssql.NVarChar(50), vswr);
    request.input('voltajeAcometida', mssql.NVarChar(50), voltajeAcometida);
    request.input('resistenciaTierra', mssql.NVarChar(50), resistenciaTierra);
    request.input('voltajeFuente', mssql.NVarChar(50), voltajeFuente);
    request.input('voltajeBateria', mssql.NVarChar(50), voltajeBateria);
    request.input('resitenciaBateria', mssql.NVarChar(50), resistenciaBateria); // Nombre corregido según la base de datos
    request.input('porcentajeBateria', mssql.NVarChar(50), porcentajeBateria);
    request.input('anguloAzimut', mssql.NVarChar(50), anguloAzimut);
    request.input('calibreBajante', mssql.NVarChar(100), calibreBajante);
    request.input('Observaciones', mssql.NVarChar(mssql.MAX), Observaciones);
    request.input('configuracionRadio', mssql.NVarChar(mssql.MAX), configuracionRadio);

    // Asignar las rutas de las imágenes
    request.input('imagenEstructura', mssql.NVarChar(mssql.MAX), imagenEstructura ? `/uploads/${imagenEstructura[0].filename}` : '');
    request.input('imagenGabinete', mssql.NVarChar(mssql.MAX), imagenGabinete ? `/uploads/${imagenGabinete[0].filename}` : '');
    request.input('imagenRadio', mssql.NVarChar(mssql.MAX), imagenRadio ? `/uploads/${imagenRadio[0].filename}` : '');
    request.input('imagenSupresor', mssql.NVarChar(mssql.MAX), imagenSupresor ? `/uploads/${imagenSupresor[0].filename}` : '');
    request.input('imagenRestaurador', mssql.NVarChar(mssql.MAX), imagenRestaurador ? `/uploads/${imagenRestaurador[0].filename}` : '');
    request.input('imagenTerminalTierra', mssql.NVarChar(mssql.MAX), imagenTerminalTierra ? `/uploads/${imagenTerminalTierra[0].filename}` : '');
    request.input('imagenBajanteTierra', mssql.NVarChar(mssql.MAX), imagenBajanteTierra ? `/uploads/${imagenBajanteTierra[0].filename}` : '');
    request.input('imagenPlaca', mssql.NVarChar(mssql.MAX), imagenPlaca ? `/uploads/${imagenPlaca[0].filename}` : '');
    request.input('imagenAdicional', mssql.NVarChar(mssql.MAX), imagenAdicional ? `/uploads/${imagenAdicional[0].filename}` : '');

    const results = await request.execute(procedureName);

    // De acuerdo a cómo definimos el SP, este retorna el id_reporte recién creado
    const idReporte = results.recordset[0].id_reporte;

    res.json({ message: 'Reporte agregado exitosamente', id_reporte: idReporte });
  } catch (error) {
    console.error('Error al ejecutar el Store Procedure:', error);
    res.status(500).json({ error: 'Error al ejecutar el Store Procedure' });
  }
});

// Ruta para obtener el estado de salud del servidor
api.get('/health-check', (req, res) => {
    res.status(200).json({ message: 'Conexión exitosa con el backend.' });
});

// ----------------- Modificar Reporte --------------------------

api.put('/modificarReporte', async (req, res) => {
  // Nombre del SP que actualiza las tablas del reporte
  const procedureName = 'sp_modificar_reporte';

  // Extraer los campos desde req.body
  const {
    id_reporte,
    tipoMantenimiento,
    modelo,
    fecha,
    horaInicio,
    horaTermino,
    responsable,
    licencia,
    registro,
    restaurador,
    circuito,
    area,
    ubicacionMapa, // Este debería llegar como objeto { lat: X, lng: Y }
    direccion,
    nsRadioGabinete,
    potenciaSalida,
    rssi,
    umbralRecepcion,
    frecuencia,
    rx,
    tx,
    cablePigtail,
    supresor,
    cableLT,
    alturaAntena,
    repetidorEnlace,
    canalUCM,
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
    resistenciaBateria,
    porcentajeBateria,
    anguloAzimut,
    placaNomenclatura,
    selladoGabinete,
    protectorAntifauna,
    cuchillasByPass,
    cuchillasLaterale,
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

    // Asignar los parámetros, ajustando los tipos según el SP
    request.input('id_reporte', mssql.Int, id_reporte);
    request.input('tipoMantenimiento', mssql.NVarChar(50), tipoMantenimiento);
    request.input('modelo', mssql.NVarChar(100), modelo);
    request.input('fecha', mssql.Date, fecha);
    request.input('horaInicio', mssql.NVarChar(20), horaInicio);
    request.input('horaTermino', mssql.NVarChar(20), horaTermino);
    request.input('responsable', mssql.NVarChar(100), responsable);
    request.input('licencia', mssql.NVarChar(20), licencia);
    request.input('registro', mssql.NVarChar(20), registro);
    request.input('restaurador', mssql.NVarChar(20), restaurador);
    request.input('circuito', mssql.NVarChar(100), circuito);
    request.input('area', mssql.NVarChar(100), area);
    request.input('ubicacionMapa', mssql.NVarChar(150), JSON.stringify(ubicacionMapa));
    request.input('direccion', mssql.NVarChar(150), direccion);
    request.input('nsRadioGabinete', mssql.NVarChar(100), nsRadioGabinete);
    request.input('potenciaSalida', mssql.NVarChar(100), potenciaSalida);
    request.input('rssi', mssql.NVarChar(10), String(rssi));
    request.input('umbralRecepcion', mssql.NVarChar(10), String(umbralRecepcion));
    request.input('frecuencia', mssql.NVarChar(100), frecuencia);
    request.input('rx', mssql.NVarChar(50), rx);
    request.input('tx', mssql.NVarChar(50), tx);
    request.input('cablePigtail', mssql.NVarChar(100), cablePigtail);
    request.input('supresor', mssql.NVarChar(100), supresor);
    request.input('cableLT', mssql.NVarChar(100), cableLT);
    request.input('alturaAntena', mssql.NVarChar(50), alturaAntena);
    request.input('repetidorEnlace', mssql.NVarChar(100), repetidorEnlace);
    request.input('canalUCM', mssql.NVarChar(100), canalUCM);
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
    request.input('potenciaRadio', mssql.NVarChar(50), potenciaRadio);
    request.input('potenciaIncidente', mssql.NVarChar(50), potenciaIncidente);
    request.input('potenciaReflejada', mssql.NVarChar(50), potenciaReflejada);
    request.input('vswr', mssql.NVarChar(50), vswr);
    request.input('voltajeAcometida', mssql.NVarChar(50), voltajeAcometida);
    request.input('resistenciaTierra', mssql.NVarChar(50), resistenciaTierra);
    request.input('voltajeFuente', mssql.NVarChar(50), voltajeFuente);
    request.input('voltajeBateria', mssql.NVarChar(50), voltajeBateria);
    request.input('resistenciaBateria', mssql.NVarChar(50), resistenciaBateria);
    request.input('porcentajeBateria', mssql.NVarChar(50), porcentajeBateria);
    request.input('anguloAzimut', mssql.NVarChar(50), anguloAzimut);
    request.input('placaNomenclatura', mssql.Bit, placaNomenclatura);
    request.input('selladoGabinete', mssql.Bit, selladoGabinete);
    request.input('protectorAntifauna', mssql.Bit, protectorAntifauna);
    request.input('cuchillasByPass', mssql.Bit, cuchillasByPass);
    request.input('cuchillasLaterale', mssql.Bit, cuchillasLaterale);
    request.input('bajanteTierra', mssql.Bit, bajanteTierra);
    request.input('terminalPAT', mssql.Bit, terminalPAT);
    request.input('apartarrayos', mssql.Bit, apartarrayos);
    request.input('cableRF', mssql.Bit, cableRF);
    request.input('calibreBajante', mssql.NVarChar(100), calibreBajante);
    request.input('Observaciones', mssql.NVarChar(mssql.MAX), Observaciones);
    request.input('configuracionRadio', mssql.NVarChar(mssql.MAX), configuracionRadio);
    request.input('imagenEstructura', mssql.NVarChar(mssql.MAX), imagenEstructura);
    request.input('imagenGabinete', mssql.NVarChar(mssql.MAX), imagenGabinete);
    request.input('imagenRadio', mssql.NVarChar(mssql.MAX), imagenRadio);
    request.input('imagenSupresor', mssql.NVarChar(mssql.MAX), imagenSupresor);
    request.input('imagenRestaurador', mssql.NVarChar(mssql.MAX), imagenRestaurador);
    request.input('imagenTerminalTierra', mssql.NVarChar(mssql.MAX), imagenTerminalTierra);
    request.input('imagenBajanteTierra', mssql.NVarChar(mssql.MAX), imagenBajanteTierra);
    request.input('imagenPlaca', mssql.NVarChar(mssql.MAX), imagenPlaca);
    request.input('imagenAdicional', mssql.NVarChar(mssql.MAX), imagenAdicional);

    const results = await request.execute(procedureName);

    res.json({ message: 'Reporte modificado exitosamente', id_reporte: id_reporte });
  } catch (error) {
    console.error('Error al ejecutar el Store Procedure:', error);
    res.status(500).json({ error: 'Error al ejecutar el Store Procedure' });
  }
});


//---------------------------- Eliminar Reporte ---------------------------

api.delete('/eliminarReporte/:id', async (req, res) => {
  const procedureName = 'sp_eliminar_reporte';
  const { id } = req.params;

  try {
    const request = SysConn.request();

    // Asignar el parámetro para el ID del reporte
    request.input('id_reporte', mssql.Int, id);

    const results = await request.execute(procedureName);

    res.json({ message: 'Reporte eliminado exitosamente', id_reporte: id });
  } catch (error) {
    console.error('Error al ejecutar el Store Procedure:', error);
    res.status(500).json({ error: 'Error al ejecutar el Store Procedure' });
  }
});


/*-----------------------------------------------------
    End Points by Carlos
-------------------------------------------------------*/

// Agregar Usuario
api.post('/AgregarUsuario', async(req, res) =>{
  const procedureName= 'AddUser';
  const {numeroTrabajador, nombre, password, tipoUsuario} = req.body;

  try {
    if (!numeroTrabajador || !nombre || !password || !tipoUsuario) {
      return res.status(400).json({message: 'Todos los campos son obligatorios'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = await poolPromise;
    const request = pool.request();

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

// Obtener Usuario
api.post('/ObtenerUsuario', async(req, res) =>{
  const {idTrabajador} = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request();
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

// Actualizar Usuario
api.post('/ActualizarUsuario', async (req, res) => {
  const procedureName= 'UserUpdate';
  const { idTrabajador, numeroTrabajador, nombre, password, tipoUsuario } = req.body;
  
  try {
    const pool = await poolPromise;
    const request = pool.request();

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

// Eliminar Usuario
api.post('/eliminarUsuario', async (req, res) => {
  const { idTrabajador } = req.body; // Obtenemos el idTrabajador del cuerpo de la solicitud
  const procedureName = 'DeleteUser';

  try {
      const pool = await poolPromise;
      const request = pool.request();

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

// Nota: express.json() y session middleware deben estar en server.js
// Aquí solo definiremos las rutas dentro del api router

// Login
api.post('/login', async (req, res) => {
  const { numeroTrabajador, password } = req.body;

  try {
    if (!numeroTrabajador || !password) {
      return res.status(400).json({ message: 'Número de trabajador y contraseña son obligatorios' });
    }

    const pool = await poolPromise;
    const request = pool.request();
    request.input('numeroTrabajador', mssql.VarChar, numeroTrabajador);

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

// Cambiar Contraseña
api.put('/CambiarPassword', async (req, res) => {
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

    const pool = await poolPromise;
    const request = pool.request();
    request.input('IdTrabajador', mssql.Int, idTrabajador);

    // Obtener la contraseña actual de la base de datos
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

// Iniciar Sesión (otra ruta)
api.post('/iniciarSesion', async (req, res) => {
  const { numeroTrabajador, password } = req.body;
  const procedureName = 'iniciarSesion'; 

  try {
      const pool = await poolPromise;
      const request = pool.request();

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

// Endpont circuito
api.post('/ObtenerCircuitos', async (req, res) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.execute('sp_ObtenerCircuitos');

    if (result.recordset.length === 0) {
      return res.status(404).json({message: 'No se encontraron circuitos'});
    }

    res.json(result.recordset);
    
  } catch (error) {
    console.error('Error al obtener datos de circuitos:', error);
    res.status(500).json({error: 'Error al obtener los datos de circuitos'});
  }
});

// Obtener Antenas
api.post('/ObtenerAntenas', async (req, res) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.execute('sp_ObtenerAntenas');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No se encontraron antenas' });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener antenas: ', error);
    res.status(500).json({ error: 'Error al obtener antenas' });
  }
});

// Obtener Cables LT
api.post('/ObtenerCablesLT', async (req, res) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.execute('sp_ObtenerCablesLT');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No se encontraron Cables LT' });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener Cables LT: ', error);
    res.status(500).json({ error: 'Error al obtener Cables LT' });
  }
});

// Obtener Cables Pigtail
api.post('/ObtenerCablesPigtail', async (req, res) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.execute('sp_ObtenerCablesPigtail');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No se encontraron Cables Pigtail' });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener Cables Pigtail: ', error);
    res.status(500).json({ error: 'Error al obtener Cables Pigtail' });
  }
});

// Obtener Canales UCM
api.post('/ObtenerCanalesUCM', async (req, res) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.execute('sp_ObtenerCanalesUCM');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No se encontraron Canales UCM' });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener Canales UCM: ', error);
    res.status(500).json({ error: 'Error al obtener Canales UCM' });
  }
});

// Obtener Frecuencias
api.post('/ObtenerFrecuencias', async (req, res) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.execute('sp_ObtenerFrecuencias');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No se encontraron Frecuencias' });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener Frecuencias: ', error);
    res.status(500).json({ error: 'Error al obtener Frecuencias' });
  }
});

// Obtener Modelos
api.post('/ObtenerModelos', async (req, res) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.execute('sp_ObtenerModelos');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No se encontraron Modelos' });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener Modelos: ', error);
    res.status(500).json({ error: 'Error al obtener Modelos' });
  }
});

// Obtener RepetidoresEnlace
api.post('/ObtenerRepetidoresEnlace', async (req, res) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.execute('sp_ObtenerRepetidoresEnlace');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No se encontraron Repetidores de Enlace' });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener RepetidoresEnlace: ', error);
    res.status(500).json({ error: 'Error al obtener RepetidoresEnlace' });
  }
});

// Obtener Supresores
api.post('/ObtenerSupresores', async (req, res) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.execute('sp_ObtenerSupresores');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No se encontraron Supresores' });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener Supresores: ', error);
    res.status(500).json({ error: 'Error al obtener Supresores' });
  }
});

// Obtener Usuarios Representantes (para dropdown de representante)
api.post('/ObtenerUsuariosRepresentantes', async (req, res) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.execute('sp_ObtenerUsuariosRepresentantes');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No se encontraron Usuarios' });
    }

    // Aquí result.recordset tendrá la columna 'nombre' de cada usuario
    // Ejemplo: [{ nombre: 'Juan Pérez' }, { nombre: 'María López' }]

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener Usuarios Representantes: ', error);
    res.status(500).json({ error: 'Error al obtener Usuarios Representantes' });
  }
});

module.exports = api;
