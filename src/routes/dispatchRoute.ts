import express from 'express';
import {
  registerDrone,
  loadDroneWithMedication,
  getLoadedMedication,
  getAvailableDrones,
  getDroneBatteryLevel
} from '../controllers/DispatchController';
import { fileErrorHandler, upload } from '../middleware/uploadMiddleware';
import tryCatch from '../utilities/tryCatch';

const router = express.Router();

router.post('/drones', tryCatch(registerDrone));
router.post(
  '/drones/load',
  upload.single('image'),
  fileErrorHandler,
  tryCatch(loadDroneWithMedication)
);
router.get('/drones/:droneId/medication', tryCatch(getLoadedMedication));
router.get('/drones/available', tryCatch(getAvailableDrones));
router.get('/drones/:droneId/battery-level', tryCatch(getDroneBatteryLevel));

export default router;
