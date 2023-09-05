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

// * Upload
export const uploadAsesores = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
      return;
    }

    // Verificar la extensión del archivo (por ejemplo, asegurarse de que sea .csv)
    const allowedExtensions = ['.csv'];
    const fileExtension = path.extname(file.originalname).toLowerCase(); // Importa 'path' al principio del archivo

    console.log(fileExtension);
    if (!allowedExtensions.includes(fileExtension)) {
      res.status(400).json({ message: 'Formato de archivo no admitido.' });
      console.log('Formato de archivo no admitido.');
      return;
    }

    // Procesar el archivo (CSV) y esperar a que se complete
    await processFile(file);

    console.log('Archivo cargado y procesado correctamente.');
    res
      .status(200)
      .json({ message: 'Archivo cargado y procesado correctamente.' });

    // Si deseas almacenar datos en la base de datos, hazlo aquí después de procesar el archivo.
    // ! Store data in database
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar el archivo.' });
  }
};
