import cron from 'node-cron';
import Drone from '../database/models/DroneModel';
import { batteryCheckerLogger } from './logger';

// Function to check drone battery levels and create history/audit event logs
async function checkBatteryLevelsAndCreateLogs() {
  try {
    const drones = await Drone.find();
    for (const drone of drones) {
      const batteryLevel = drone.batteryCapacity;

      // Create a history/audit event log for the battery level
      batteryCheckerLogger.info(
        'DRONE_SERIALNUMBER: ',
        drone.serialNumber,
        '|',
        'BATTERY_LEVEL: ',
        batteryLevel
      );

      if (batteryLevel <= 10) {
        batteryCheckerLogger.info(
          'DRONE_SERIALNUMBER: ',
          drone.serialNumber,
          '|',
          'BATTERY_CRITICAL',
          batteryLevel
        );
      }
      if (batteryLevel <= 25) {
        batteryCheckerLogger.info(
          'DRONE_SERIALNUMBER: ',
          drone.serialNumber,
          '|',
          'BATTERY_LOW: ',
          batteryLevel
        );
      }
    }
  } catch (error) {
    batteryCheckerLogger.info('Error occurred while checking battery levels:', error);
  }
}

// Schedule the task to run every hour
export const startCronJob = () => {
  cron.schedule('0 * * * *', () => {
    checkBatteryLevelsAndCreateLogs();
  });
};
