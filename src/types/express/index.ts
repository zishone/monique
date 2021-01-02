import 'express';
import { FilterQuery, FindOneOptions } from 'mongodb';

declare global {
  namespace Express {
    interface Request {
      mquery: {
        filter: FilterQuery<any>;
        options: FindOneOptions<any>;
      };
    }
  }
}
