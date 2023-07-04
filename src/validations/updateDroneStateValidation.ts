import { Request, Response, NextFunction } from 'express';
import validate from 'validate.js';
import { idRule, stateRule } from './rules';
import { failure } from '../utilities/response';

export default (req: Request, res: Response, next: NextFunction) => {
  const { params, body } = req;
  const constraint = {
    ...idRule('droneId'),
    ...stateRule('state')
  };
  const data = { droneId: params.droneId, ...body };
  const validationError = validate(data, constraint);
  if (validationError) {
    return failure(422, validationError, res);
  }

  return next();
};
