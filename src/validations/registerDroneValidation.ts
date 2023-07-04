import { Request, Response, NextFunction } from 'express';
import validate from 'validate.js';
import { modelRule, serialNumberRule, weightRule } from './rules';
import { failure } from '../utilities/response';

export default (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const constraint = {
    ...serialNumberRule('serialNumber'),
    ...modelRule('model'),
    ...weightRule(body.weightLimit)
  };

  const validationError = validate(body, constraint);
  if (validationError) {
    return failure(422, validationError, res);
  }

  return next();
};
