import { Router } from 'express';
import {
  getAllAsesores,
  uploadAsesores,
} from '../controllers/asesores.controller.js';
import upload from '../utils/fileUpload.js';

const router = Router();

// Middleware upload file
const uploadMiddleware = upload.single('file'); // 'file' -> field name in form

router.get('/api/asesores', getAllAsesores);
router.post('/api/upload', uploadMiddleware, uploadAsesores);

export default router;
