"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterParserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const LZString = require("lz-string");
const qs = require("qs");
let FilterParserMiddleware = class FilterParserMiddleware {
    use(req, res, next) {
        const filterString = req.query.filters;
        if (filterString) {
            try {
                const decompressedFilters = LZString.decompressFromEncodedURIComponent(filterString);
                if (decompressedFilters) {
                    req.listFilters = qs.parse(decompressedFilters);
                }
            }
            catch (error) {
                console.error('Failed to parse filters:', error.message);
                req.listFilters = {};
            }
        }
        else {
            req.listFilters = {};
        }
        next();
    }
};
exports.FilterParserMiddleware = FilterParserMiddleware;
exports.FilterParserMiddleware = FilterParserMiddleware = __decorate([
    (0, common_1.Injectable)()
], FilterParserMiddleware);
//# sourceMappingURL=filter-parse.middleware.js.map