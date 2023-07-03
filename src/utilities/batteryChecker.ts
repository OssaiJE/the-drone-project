import { config } from 'dotenv';
import cron from 'node-cron';
import * as log4js from 'log4js';
import Drone from '../database/models/DroneModel';

config();

const { logBatteryLevel } = process.env;

// Configure logger
log4js.configure({
  appenders: { BatteryLevel: { type: 'file', filename: logBatteryLevel } },
  categories: { default: { appenders: ['BatteryLevel'], level: 'info' } }
});

const logger = log4js.getLogger('BatteryLevel');

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
      } else if (batteryLevel <= 25) {
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
cron.schedule('30 30 * * * *', () => {
  checkBatteryLevelsAndCreateLogs();
});
