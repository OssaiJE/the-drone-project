import { config } from 'dotenv';
import cron from 'node-cron';
import Drone from '../database/models/DroneModel';
import logger from './logger';

config();

// const { logBatteryLevel } = process.env;

// Function to check drone battery levels and create history/audit event logs
async function checkBatteryLevelsAndCreateLogs() {
  try {
    const drones = await Drone.find();

    for (const drone of drones) {
      const batteryLevel = drone.batteryCapacity;

      // Create a history/audit event log for the battery level
      logger.info(
        'DRONE_SERIALNUMBER: ',
        drone.serialNumber,
        'BATTERY_LEVEL: ',
        batteryLevel
      );

      if (batteryLevel <= 10) {
        logger.info(
          'DRONE_SERIALNUMBER: ',
          drone.serialNumber,
          'BATTERY_CRITICAL',
          batteryLevel
        );
      }
      if (batteryLevel <= 25) {
        logger.warn(
          'DRONE_SERIALNUMBER: ',
          drone.serialNumber,
          'BATTERY_LOW: ',
          batteryLevel
        );
      }
    }
  } catch (error) {
    logger.error('Error occurred while checking battery levels:', error);
  }
}

// Schedule the task to run every half hour
export const startCronJob = () => {
  cron.schedule('0 *,30 * * * *', () => {
    checkBatteryLevelsAndCreateLogs();
  });
};
