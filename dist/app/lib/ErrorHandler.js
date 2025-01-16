"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../core/@shared/domain");
class ErrorHandler {
    constructor(res) {
        this.res = res;
        this.res = res;
    }
    handle(error) {
        if (error instanceof domain_1.DomainException) {
            this.res.status(400).json({ error: error.message });
        }
        else {
            console.error(error);
            this.res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map