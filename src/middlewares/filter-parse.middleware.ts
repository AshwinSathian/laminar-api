import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as LZString from 'lz-string';
import * as qs from 'qs';

@Injectable()
export class FilterParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const filterString = req.query.filters as string;

    if (filterString) {
      try {
        const decompressedFilters =
          LZString.decompressFromEncodedURIComponent(filterString);
        if (decompressedFilters) {
          req.listFilters = qs.parse(decompressedFilters);
        }
      } catch (error) {
        console.error('Failed to parse filters:', error.message);
        req.listFilters = {};
      }
    } else {
      req.listFilters = {};
    }

    next();
  }
}
