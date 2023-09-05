import { getConnection, sql, queriesAsesores } from '../database';
import { processFile } from '../utils/fileHandler.js';
import path from 'path';

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

// * Upload CVS File
export const uploadAsesores = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
      return;
    }

    // Verify file extension
    const allowedExtensions = ['.csv'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    // console.log(fileExtension);

    // Validate extension matches
    if (!allowedExtensions.includes(fileExtension)) {
      res.status(400).json({ message: 'Formato de archivo no admitido.' });
      console.log('Formato de archivo no admitido.');
      return;
    }

    // Process file and wait for the response
    await processFile(file);
    // console.log(req.file);
    console.log('Archivo cargado y procesado correctamente.');
    res
      .status(200)
      .json({ message: 'Archivo cargado y procesado correctamente.' });

    // ! Store data in database
    // --- status: 201

    // ! Delete file after successful
    // ---
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar el archivo.' });
  }
};
