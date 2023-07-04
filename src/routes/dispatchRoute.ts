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
import idValidation from '../validations/idValidation';
import registerDroneValidation from '../validations/registerDroneValidation';
import loadDroneValidation from '../validations/loadDroneValidation';

const router = express.Router();

router.post('/drones', registerDroneValidation, tryCatch(registerDrone));
router.post(
  '/drones/load',
  loadDroneValidation,
  upload.single('image'),
  fileErrorHandler,
  tryCatch(loadDroneWithMedication)
);
router.get('/drones/:droneId/medication', idValidation, tryCatch(getLoadedMedication));
router.get('/drones/available', tryCatch(getAvailableDrones));
router.get(
  '/drones/:droneId/battery-level',
  idValidation,
  tryCatch(getDroneBatteryLevel)
);

export default router;
