import sql from 'mssql';
import config from '../config';

// Setting Connection Properties for Database
const dbSettings = {
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbDatabase,
  server: config.dbServer,
  port: Number(config.dbPort),
  options: {
    encrypt: true, // For Azure
    trustServerCertificate: true, // Change to true for local dev/ self-signed certs
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    // const result = await pool.request().query('SELECT 1');
    // console.log(result);
    return pool;
  } catch (error) {
    console.error(error.message);
  }
}

export { sql };
