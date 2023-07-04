import { Request, Response, NextFunction } from 'express';
import validate from 'validate.js';
import { idRule } from './rules';
import { failure } from '../utilities/response';

export default (req: Request, res: Response, next: NextFunction) => {
  const { params } = req;
  const constraint = {
    ...idRule('droneId')
  };

  const validationError = validate(params, constraint);
  if (validationError) {
    return failure(422, validationError, res);
  }

  return next();
};
