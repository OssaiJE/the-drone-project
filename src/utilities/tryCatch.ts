import { Request, Response, NextFunction } from 'express';
import { failure } from './response';
import { logger } from './logger';

export default (
    method: (req: Request, res: Response, next?: NextFunction) => Promise<unknown>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await method(req, res, next);
    } catch (error) {
      logger.error(`${(error as Error).message}`, error);
      return failure(503, 'Some error occurred', res);
    }
  };
