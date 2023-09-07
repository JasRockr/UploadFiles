import fs from 'fs/promises';
import path from 'path';

// Save file as JSON objects
export async function saveFileAsJson(name, data) {
  try {
    // Convert the list of objects to formatted JSON text
    const jsonText = JSON.stringify(data, null, 2);
    // Create an output file name by replacing the extension
    const outputFilename = name.replace('.csv', '.json');
    // Write the resulting JSON file
    await fs.writeFile(outputFilename, jsonText);
    console.log(`Archivo JSON guardado: ${outputFilename}`);
  } catch (error) {
    console.error(`Error al guardar el archivo JSON: ${name}`, error);
  }
}

// Verify file extension
export function isValidFileCsv(file) {
  const allowedExtensions = ['.csv'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  return allowedExtensions.includes(fileExtension);
}

// Remove file
export async function removeFile(file) {
  try {
    await fs.unlink(file);
    console.log(`Archivo eliminado: ${file}`);
  } catch (error) {
    console.error(`Error al eliminar el archivo: ${file}`, error);
  }
}

// Remove all files and folders
export async function removeFileAndDirectory(filePath) {
  try {
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      const files = await fs.readdir(filePath);
      console.log('files: ', files);
      for (const file of files) {
        console.log('mid: ', filePath);
        const fileToRemove = path.join(filePath, file);
        console.log('fileToRemove: ', file);
        await removeFileAndDirectory(fileToRemove);
      }

      // Luego de eliminar los archivos contenidos, elimina la carpeta vacía
      await fs.rmdir(filePath);
    } else {
      await fs.unlink(filePath);
    }

    console.log(`Archivo o directorio eliminado: ${filePath}`);

    // Para eliminar la carpeta contenedora después de eliminar el archivo
    const containingFolder = path.dirname(filePath);
    await fs.rmdir(containingFolder);
    console.log(`Carpeta contenedora eliminada: ${containingFolder}`);
  } catch (error) {
    console.error(`Error al eliminar archivo o directorio: ${filePath}`, error);
  }
}
