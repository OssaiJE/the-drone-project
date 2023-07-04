import { Request, Response, NextFunction } from 'express';
import validate from 'validate.js';
import { idRule, codeRule, nameRule, weightRule } from './rules';
import { failure } from '../utilities/response';

export default (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  if (!req.file || !req.files) {
    return failure(422, 'Image is required.', res);
  }
  const constraint = {
    ...idRule('droneId'),
    ...nameRule('name'),
    ...codeRule('code'),
    ...weightRule(body.weightLimit)
  };

  const validationError = validate(body, constraint);
  if (validationError) {
    return failure(422, validationError, res);
  }

  return next();
};
