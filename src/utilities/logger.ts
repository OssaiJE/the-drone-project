import log4js, { Configuration } from 'log4js';
import { config } from 'dotenv';

config();

const { logpath, logpathDev, logpathTest, NODE_ENV } = process.env;

let logPath: string | undefined;

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
      maxLogSize: 1024 * 1024 * 1, // 1024 * 1024 * 1 = 1M
      backups: 30
    }
  },
  categories: {
    default: { appenders: ['out', 'alertlog'], level: 'info' }
  }
});

export default log4js.getLogger('alertlog');
