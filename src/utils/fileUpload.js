import multer from 'multer';
import fs from 'fs';

// Define folder name to store files uploaded
const uploadsFolder = 'uploads';

// Set Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create folder if it doesn't exist
    if (!fs.existsSync(uploadsFolder)) {
      fs.mkdirSync(uploadsFolder);
    }
    // Folder to store uploaded
    cb(null, `${uploadsFolder}/`);
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    const filenameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, '');
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    // Define name with unique suffix
    cb(null, `${filenameWithoutExtension}_${uniqueSuffix}.${fileExtension}`);
  },
});

// Upload file
const upload = multer({ storage: storage });

export default upload;
