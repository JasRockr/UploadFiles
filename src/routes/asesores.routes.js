import { Router } from 'express';
import {
  getAllAsesores,
  uploadAsesores,
} from '../controllers/asesores.controller.js';
import { uploadFile, processFile } from "../middlewares/uploadHandler.middleware.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { asesorSchema } from "../schemas/asesores.schema.js";

const router = Router();

router.get('/api/asesores', getAllAsesores);
router.post('/api/upload', uploadFile, processFile, uploadAsesores);
// router.post('/api/upload', uploadFile, processFile, schemaValidation(asesorSchema), uploadAsesores);

export default router;
