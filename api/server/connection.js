// server/connection.js

const SysConfig = require('./config');
const mssql = require('mssql');

const config = {
  user: SysConfig.DbUserName,
  password: SysConfig.DbUserPass,
  server: SysConfig.ServerName,
  database: SysConfig.DbName,
  options: {
    encrypt: true, // Cambiar a false si no estás usando Azure
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000,
    trustServerCertificate: true // Cambiar a false en producción si usas certificados válidos
  }
};

// Crear una instancia de ConnectionPool
const pool = new mssql.ConnectionPool(config);

// Conectar al pool y manejar el resultado
const poolConnect = pool.connect()
  .then(() => {
    console.log('Conexión exitosa a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Error al conectar a SQL Server:', err.message);
    process.exit(1); // Detener la aplicación si no se puede conectar
  });

// Manejar errores inesperados en el pool
pool.on('error', err => {
  console.error('Error inesperado en el pool de conexiones:', err);
  process.exit(-1); // Detener la aplicación ante errores críticos
});

// Exportar una promesa que resuelve el pool una vez conectado
module.exports = poolConnect;
