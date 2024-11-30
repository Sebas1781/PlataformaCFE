const SysConfig = require('./config');

switch (SysConfig.DbType) {
  case 'mssql':
      module.exports = {
          database: {
              user: SysConfig.DbUserName,
              password: SysConfig.DbUserPass,
              server: SysConfig.ServerName,
              port: SysConfig.ServerPort ,
              database: SysConfig.DbName,
              options: {
                  trustServerCertificate: true,
                  encrypt: true,
              }
         }
      }
      break;
  case 'SQL':
      break;
}
