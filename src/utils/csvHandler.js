import fs from 'fs/promises';

// Convert csv to json
export const processCsvFile = async file => {
  try {
    // Get the file path and name
    const filePath = file.path; // Path file CSV

    // Read the entire content of the CSV file
    const fileContentBuffer = await fs.readFile(filePath);
    let fileContent = fileContentBuffer.toString('utf-8');

    // Check if the file starts with the BOM (U+FEFF) and delete it if necessary.
    if (fileContent.charCodeAt(0) === 0xfeff) {
      fileContent = fileContent.substring(1);
    }

    // Split the content into lines
    const allLines = fileContent.split('\r\n');
    // The first line is the header (field names)
    const header = allLines[0];
    // The remaining lines contain data
    const dataLines = allLines.slice(1);

    // Split the field names
    const fieldNames = header.split(',');
    // Initialize a list of objects
    let objectList = [];

    // Iterate through the data lines
    for (let i = 0; i < dataLines.length; i++) {
      if (dataLines[i] === '') {
        continue; // Skip blank lines
      }
      let obj = {};

      // Split the data in the current line
      const data = dataLines[i].split(',');

      // Iterate through the field names
      for (let j = 0; j < fieldNames.length; j++) {
        const fieldName = fieldNames[j].toLowerCase();
        const asNumber = Number(data[j]);
        // Store the value in the object (use it as a number if it's a number)
        obj[fieldName] = isNaN(asNumber) ? data[j] : asNumber;
        // obj[fieldName] = data[j];
      }
      // Add the object to the list
      objectList.push(obj);
    }

    const data = objectList;
    // Resolve the promise after processing the file
    return data;
  } catch (error) {
    throw error;
  }
};
