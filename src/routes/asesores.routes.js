import { Router } from 'express';
import {
  getAllAsesores,
  uploadAsesores,
} from '../controllers/asesores.controller.js';
import multer from 'multer';

const router = Router();
// * Upload File

// Set Multer for handling file upload
const upload = multer({ dest: 'uploads/' });

router.get('/api/asesores', getAllAsesores);
router.post('/api/upload', upload.single('file'), uploadAsesores);

export default router;
