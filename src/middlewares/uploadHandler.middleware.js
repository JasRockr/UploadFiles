import multer from 'multer';
import upload from '../utils/fileUpload.js';
import { processCsvFile } from '../utils/csvHandler.js';
import { isValidFileCsv } from '../utils/commonUtils.js';

// Upload file
export function uploadFile(req, res, next) {
  // 'file' -> field name in form
  upload.single('file')(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res
          .status(400)
          .json({ message: 'El archivo es demasiado grande.' });
      }
      return res.status(500).json({ message: 'Error cargando desde Multer' });
    } else if (err) {
      return res
        .status(500)
        .json({ message: 'Error en la carga del archivo.' });
    }
    // console.log('Upload success');
    next();
  });
}

// Process file
export async function processFile(req, res, next) {
  const file = req.file;

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
  try {
    req.dataRows = await processCsvFile(file);
    
    // return console.log(dataRows);
    next();
  } catch (error) {
    console.error('Error al procesar el archivo CSV.', error);
    return res
      .status(500)
      .json({ message: 'Error al procesar el archivo CSV.' });
  }
}
