import { getConnection, sql, queriesAsesores } from '../database';
import { processFile } from '../utils/fileHandler.js';

// * Get all records
export const getAllAsesores = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queriesAsesores.getAllAsesores);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// * Upload
export const uploadAsesores = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
      return;
    }
    // Connect to database
    const pool = await getConnection();
    // Process file (CSV)
    processFile(file);
    console.log('file upload');
    res
      .status(200)
      .json({ message: 'Archivo cargado y procesado correctamente.' });
    // ! Store data in database
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar el archivo.' });
  }
};
