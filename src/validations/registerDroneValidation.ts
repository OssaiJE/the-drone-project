import { Request, Response, NextFunction } from 'express';
import validate from 'validate.js';
import { modelRule, serialNumberRule, weightRule } from './rules';
import { failure } from '../utilities/response';
import logger from '../utilities/logger';

export default (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  logger.info('I got here', body);
  const constraint = {
    ...serialNumberRule('serialNumber'),
    ...modelRule('model'),
    ...weightRule
  };

  const validationError = validate(body, constraint);
  if (validationError) {
    return failure(422, validationError, res);
  }

  return next();
};
