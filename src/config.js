import { config } from 'dotenv';
config();

export default {
  // Default configuration
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 5000,
  // Database configuration
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASS || '',
  dbServer: process.env.DB_SERVER || '',
  dbName: process.env.DB_NAME || '',
  dbPort: process.env.DB_PORT || '',
  // Schemas
  tblAsesores: process.env.TBL_ASESORES || '',
};
