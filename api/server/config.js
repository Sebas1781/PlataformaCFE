require('dotenv').config();

const SysConfig = {
  DbType: 'mssql',
  ServerName: process.env.DB_SERVER,
  ServerPort: 1433,
  DbName: process.env.DB_NAME,
  DbUserName: process.env.DB_USER,
  DbUserPass: process.env.DB_PASSWORD,
};

module.exports = SysConfig;
