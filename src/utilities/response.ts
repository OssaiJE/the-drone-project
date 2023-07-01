import logger from './logger';
import { Response } from 'express';

/**
 * Returns an error message to the client
 * @param {number} status HTTP status code
 * @param {object|string} message Error message as an object/text
 * @param {Response} res HTTP response object
 * @returns {Response} response
 */
export const failure = (
  status = 503,
  message = 'An error occurred',
  res: Response
): Response => {
  const errorObject = {
    status,
    message
  };
  logger.error(errorObject);
  return res.status(status).send(errorObject);
};

/**
 * Returns a success message to the client
 * @param {Response} res HTTP response object
 * @param {number} status HTTP status code
 * @param {any} message Message as an object/text
 * @param {object} data Response data
 * @returns {Response} response
 */
export const success = async (
  res: Response,
  status = 200,
  message = 'Success',
  data: object = {}
): Promise<Response> => {
  const successObject = {
    status,
    message,
    data
  };
  logger.info(message, data);
  return res.status(status).send(successObject);
};
