import { Request, Response } from 'express';
import DispatchService from '../services/DispatchService';
import { failure, success } from '../utilities/response';
import logger from '../utilities/logger';

const dispatchService = new DispatchService();

/**
 * `registerDrone` is an asynchronous function that handles the registration of a drone.
 * @param {Request} req -
 * @param {Response} res -
 * @returns a success response .
 */
export const registerDrone = async (req: Request, res: Response) => {
  logger.info('RegisterDrone controller', { body: req.body });
  const { serialNumber, model, weightLimit } = req.body;
  const droneExist = await dispatchService.getDroneBySerialNumber(serialNumber);
  if (droneExist) {
    return failure(400, 'Drone has already been registered', res);
  }
  const drone = await dispatchService.registerDrone(serialNumber, model, weightLimit);

  return success(res, 201, 'Registered a drone Successfully', drone);
};

/**
 * The function `loadDroneWithMedication` loads a drone with medication based on the provided request
 * data.
 * @param {Request} req
 * @param {Response} res -
 * @returns
 */
export const loadDroneWithMedication = async (req: Request, res: Response) => {
  logger.info('LoadDroneWithMedication controller', { body: req.body });
  const { droneId, name, weight, code } = req.body;
  let image;
  if (req.file) {
    image = req.file.path;
  }
  logger.info('Retrieve the drone from the database');
  const drone = await dispatchService.getDrone(droneId);

  if (!drone) {
    return failure(422, 'Drone does not exist.', res);
  }

  if (drone.weightLimit < weight) {
    return failure(422, 'Drone cannot carry the weight of the medication', res);
  }

  if (drone.batteryCapacity < 25) {
    return failure(422, 'Drone battery level is below 25%', res);
  }
  const loadedDrone = await dispatchService.loadDroneWithMedication(
    name,
    weight,
    code,
    image,
    droneId
  );
  logger.info('Loaded drone object: ', loadedDrone);

  return success(res, 201, 'Loaded a drone with medication successfully', loadedDrone);
};

/**
 * The function retrieves the loaded medication for a given drone.
 * @param {Request} req -
 * @param {Response} res -
 * @returns a response with the loaded medication.
 */
export const getLoadedMedication = async (req: Request, res: Response) => {
  const { droneId } = req.params;
  const drone = await dispatchService.getDrone(droneId);
  if (!drone) {
    return failure(400, 'Drone does not exist', res);
  }
  const medication = await dispatchService.getLoadedMedication(droneId);

  return success(res, 200, 'Loaded medication successfully retrieved', medication);
};

/**
 * The function `getAvailableDrones` retrieves a list of available drones.
 * @param {Request} req -
 * @param {Response} res -
 * @returns a response object with a status code, a message, and an array of available drones.
 */
export const getAvailableDrones = async (req: Request, res: Response) => {
  const drones = await dispatchService.getAvailableDrones();
  if (drones.length < 1) {
    return failure(400, 'There is no available drones', res);
  }
  logger.info('getAvailableDrones', drones);

  return success(res, 200, 'Available drones retrieved', drones);
};

/* The `getDroneBatteryLevel` function is an asynchronous function that retrieves the battery level of
a drone. */
export const getDroneBatteryLevel = async (req: Request, res: Response) => {
  const { droneId } = req.params;

  const batteryLevel = await dispatchService.getDroneBatteryLevel(droneId);
  logger.info('getDroneBatteryLevel Controller', batteryLevel);
  return success(res, 200, 'Successfully retrieved drone batterry level', {
    batteryLevel
  });
};
