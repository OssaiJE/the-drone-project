import log4js, { Configuration, Logger } from 'log4js';
import { config } from 'dotenv';

config();

const { logpath, logpathDev, logpathTest, logBatteryLevel, NODE_ENV } = process.env;

let logPath: string | undefined;
const logPathBattery: string | undefined = logBatteryLevel;

const generateRefID = (): string => {
  return new Date().getTime().toString();
};

const logFileLayout: Configuration['appenders']['layout'] = {
  type: 'pattern',
  pattern: '[%x{refID}] [%d] [%p] %c - %m%n',
  tokens: {
    refID: () => {
      return generateRefID();
    }
  }
};

if (NODE_ENV === 'production') {
  logPath = logpath!;
} else if (NODE_ENV === 'development') {
  logPath = logpathDev!;
} else {
  logPath = logpathTest!;
}

log4js.configure({
  appenders: {
    layout: logFileLayout,
    out: { type: 'stdout', layout: logFileLayout },
    alertlog: {
      type: 'file',
      filename: logPath,
      pattern: 'yyyy-MM-dd.txt',
      layout: logFileLayout,
      alwaysIncludePattern: true,
      maxLogSize: 1024 * 1024 * 2, // 1024 * 1024 * 2 = 2M
      backups: 30
    },
    batteryChecker: {
      type: 'file',
      filename: logPathBattery, // Set the desired log file path for batteryChecker
      pattern: 'yyyy-MM-dd.txt',
      layout: logFileLayout,
      alwaysIncludePattern: true,
      maxLogSize: 1024 * 1024 * 2, // 1024 * 1024 * 2 = 2M
      backups: 30
    }
  },
  categories: {
    default: { appenders: ['out', 'alertlog'], level: 'info' },
    alertlog: { appenders: ['out', 'alertlog'], level: 'info' },
    batteryChecker: { appenders: ['out', 'batteryChecker'], level: 'info' }
  }
});

export const logger: Logger = log4js.getLogger('alertlog');
export const batteryCheckerLogger: Logger = log4js.getLogger('batteryChecker');
