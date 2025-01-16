"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
class DomainException extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'DomainException';
    }
}
exports.DomainException = DomainException;
//# sourceMappingURL=DomainException.js.map