import fs from 'fs';
import csvParser from 'csv-parser';

export const processFile = async file => {
  return new Promise(async (resolve, reject) => {
    try {
      // Process file (CSV)
      const csvFilePath = file.path; // Path file CSV
      const dataRows = [];
      console.log(csvFilePath);

      fs.createReadStream(csvFilePath, { encoding: 'utf-8' })
        .pipe(csvParser())
        .on('data', async data => {
          dataRows.push(data); // Store data in array
        })
        .on('end', () => {
          console.log(dataRows); // Show data in console
          resolve(); // Resolve the promise after the data is processed
        });
    } catch (error) {
      reject(error);
    }
  });
};
