import logger from '../utilities/logger';
import Drone from '../database/models/DroneModel';
import Medication from '../database/models/MedicationModel';
import IDrone from '../interface/IDrone';
import IMedication from '../interface/IMedication';

/* The `class DispatchService` is a class that provides various methods for managing drones
and medications in a dispatch system. */
class DispatchService {
  /**
   * The function `registerDrone`
   * @param {string} serialNumber -
   * @param {string} model -
   * @param {number} weightLimit -
   * @returns a Promise that resolves to an object of type IDrone.
   */
  async registerDrone(
    serialNumber: string,
    model: string,
    weightLimit: number
  ): Promise<IDrone> {
    logger.info('Create a new drone with the provided details" ', {
      serialNumber,
      model,
      weightLimit
    });

    const drone = new Drone({
      serialNumber,
      model,
      weightLimit,
      batteryCapacity: 100, // Assuming new drones have fully charged batteries
      state: 'IDLE'
    });
    await drone.save();
    logger.info('New saved drone object: ', drone);
    return drone;
  }

  /**
   * The function `getDrone` retrieves a drone object from the database.
   * @param {string} droneId -
   * @returns the drone object.
   */
  async getDrone(droneId: string) {
    const drone = await Drone.findById(droneId);
    logger.info('getDrone Service', drone);

    return drone;
  }

  /**
   * The function `getDroneBySerialNumber` retrieves a drone object from the database.
   * @param {string} serialNumber -
   * @returns the drone object.
   */
  async getDroneBySerialNumber(serialNumber: string) {
    const drone = await Drone.findOne({ serialNumber });
    logger.info('getDroneBySerialNumber Service', drone);

    return drone;
  }

  /**
   * The function `getMedication`
   * @param {string} medicationId -
   * @returns The `getMedication` function is returning the `medication` object.
   */
  async getMedication(medicationId: string) {
    const medication = await Medication.findById(medicationId);
    logger.info('getMedication Service', medication);

    return medication;
  }

  /**
   * The function `loadDroneWithMedication`
   * @param {string} name -
   * @param {number} weight -
   * @param {string} code -
   * @param {string | undefined} image -
   * @param {string} droneId -
   * @returns a Promise that resolves to an object of type IMedication.
   */
  async loadDroneWithMedication(
    name: string,
    weight: number,
    code: string,
    image: string | undefined,
    droneId: string
  ): Promise<IMedication> {
    await Drone.findByIdAndUpdate(droneId, { state: 'LOADING' });

    const medication = new Medication({
      name,
      weight,
      code,
      image,
      droneId
    });
    await medication.save();
    await Drone.findByIdAndUpdate(droneId, {
      state: 'LOADED',
      medicationId: medication._id
    });

    return medication;
  }

  /**
   * The function `getLoadedMedication` retrieves the loaded medication for a given drone by its ID.
   * @param {string} droneId -
   * @returns the drone's medication.
   */
  async getLoadedMedication(droneId: string): Promise<IDrone> {
    logger.info('getLoadedMedication service: ', { droneId });
    const drone = await Drone.findById(droneId).populate('medicationId');
    if (!drone) {
      logger.error('Drone not found', { droneId });
      throw new Error('Drone not found');
    }
    logger.info('Loaded Medication : ', { drone });

    return drone;
  }

  /**
   * The function `getAvailableDrones` retrieves all drones that are in the 'IDLE' state.
   * @returns The function `getAvailableDrones` returns a Promise that resolves to an array of `IDrone`
   * objects.
   */
  async getAvailableDrones(): Promise<IDrone[]> {
    logger.info('getAvailableDrones service');
    const drones = await Drone.find({ state: 'IDLE' });

    return drones;
  }

  async getDroneBatteryLevel(droneId: string): Promise<number> {
    logger.info('getDroneBatteryLevel service');

    const drone = await Drone.findById(droneId);

    if (!drone) {
      throw new Error('Drone not found');
    }

    return drone.batteryCapacity;
  }
}

export default DispatchService;
