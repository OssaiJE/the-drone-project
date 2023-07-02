import dotenv from 'dotenv';
import app from '../index';
import logger from '../utilities/logger';

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  logger.info('The drone project now listening on PORT ', port);
});
