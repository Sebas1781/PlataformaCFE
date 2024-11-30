const SysConfig = require('./config');
const mssql = require('mssql');

let SysConn;

const config = {
  user: SysConfig.DbUserName,
  password: SysConfig.DbUserPass,
  server: SysConfig.ServerName,
  database: SysConfig.DbName,
  options: {
    encrypt: true, 
    enableArithAbort: true,
    connectTimeout: 30000, 
    requestTimeout: 30000, 
    trustServerCertificate: true 
  }
};

async function connectToDatabase() {
  if (SysConn) {
    try {
      await SysConn.close();
      console.log('Conexión previa a SQL Server cerrada correctamente.');
    } catch (err) {
      console.error('Error al cerrar la conexión previa:', err.message);
    }
  }

  try {
    SysConn = await mssql.connect(config);
    console.log('Conexión exitosa a SQL Server');
  } catch (err) {
    console.error('Error al conectar a SQL Server:', err.message);
  }
}

connectToDatabase();

module.exports = {
  request: () => SysConn.request()
};
