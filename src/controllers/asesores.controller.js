import { getConnection, sql, queriesAsesores } from '../database';
import { processCsvFile } from '../utils/csvHandler.js';
import {
  isValidFileCsv,
  saveFileAsJson,
  removeFile,
} from '../utils/commonUtils.js';

/**
 * //* Get all records
 * @param {*} req
 * @param {*} res
 */
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

/**
 * //* Upload CSV File
 * @param {file} req
 * @param {*} res
 * @returns
 */
export const uploadAsesores = async (req, res) => {
  let pool;
  const file = req.file; // File received from client
  const fileName = file.filename; // File name
  const filePath = file.path; // File path

  // Verify that the file exists
  if (!file) {
    res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
    return;
  }

  // Verify file extension
  if (!isValidFileCsv(file)) {
    res.status(400).json({ message: 'Formato de archivo no admitido.' });
    console.log('Formato de archivo no admitido.');
    return;
  }

  // Process file and wait for the response
  const dataRows = await processCsvFile(file);

  try {
    // Get pool connection to database
    pool = await getConnection();

    // Store data in database
    const transaction = new sql.Transaction(pool);

    // Begin transaction
    await transaction.begin();

    // Iterate over all records
    for (const row of dataRows) {
      try {
        // console.log(row);
        // Define params of the transaction
        const result = await pool
          .request()
          // Params for the query
          .input('id_asesor', sql.VarChar, row.id_asesor.toString())
          .input('nombre_asesor', sql.VarChar, row.nombre_asesor)
          .input('equipo_entidad', sql.VarChar, row.equipo_entidad)
          .input('compania', sql.VarChar, row.compania)
          .input('observaciones', sql.VarChar, row.observaciones)
          .input('fecha_novedad', sql.DateTime, new Date(row.fecha_novedad))
          .input('usuario', sql.VarChar, row.usuario)
          // Exec query 'addNewAsesor' using the parameters defined
          .query(queriesAsesores.addNewAsesor);

        console.log(`Registro insertado: ${row.id_asesor}`);
      } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        console.error(
          `Error al insertar registro: ${row.id_asesor}. Valor: ${row.id_asesor}`,
          error,
        );
        return res
          .status(500)
          .json({ message: 'Error al insertar registros.' });
      }
    }

    // Confirmar la transacción si todas las inserciones fueron exitosas
    await transaction.commit();

    console.log('Archivo cargado y procesado correctamente.');
    res
      .status(200)
      .json({ message: 'Archivo cargado y procesado correctamente.' });

    // ! Create log file
    // ---
  } catch (error) {
    console.error('Error al obtener la conexión a la base de datos.', error);
    res
      .status(500)
      .json({ message: 'Error al obtener la conexión a la base de datos.' });
  } finally {
    if (pool) {
      // Close connection to database
      pool.close();
      // Save data as file JSON
      saveFileAsJson(fileName, dataRows);
      // Remove file after successful
      removeFile(filePath);
    }
  }
};
