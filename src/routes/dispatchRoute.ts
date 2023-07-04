import express from 'express';
import {
  registerDrone,
  loadDroneWithMedication,
  getLoadedMedication,
  getAvailableDrones,
  getDroneBatteryLevel,
  updateDroneState
} from '../controllers/DispatchController';
import { fileErrorHandler, upload } from '../middleware/uploadMiddleware';
import tryCatch from '../utilities/tryCatch';
import idValidation from '../validations/idValidation';
import registerDroneValidation from '../validations/registerDroneValidation';
import loadDroneValidation from '../validations/loadDroneValidation';
import updateDroneStateValidation from '../validations/updateDroneStateValidation';

const router = express.Router();

router.post('/drones', registerDroneValidation, tryCatch(registerDrone));
router.post(
  '/drones/load',
  upload.single('image'),
  fileErrorHandler,
  loadDroneValidation,
  tryCatch(loadDroneWithMedication)
);
router.patch(
  '/drones/:droneId/state',
  updateDroneStateValidation,
  tryCatch(updateDroneState)
);
router.get('/drones/:droneId/medication', idValidation, tryCatch(getLoadedMedication));
router.get('/drones/available', tryCatch(getAvailableDrones));
router.get(
  '/drones/:droneId/battery-level',
  idValidation,
  tryCatch(getDroneBatteryLevel)
);

export default router;
