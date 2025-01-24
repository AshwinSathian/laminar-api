import { FiltersPayload } from '@laminar-api/interfaces';
import 'express';

declare global {
  namespace Express {
    interface Request {
      listFilters?: FiltersPayload;
    }
  }
}
