"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = void 0;
class Uuid extends String {
    constructor(value) {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value)) {
            throw new Error('Invalid Uuid');
        }
        super(value);
    }
}
exports.Uuid = Uuid;
//# sourceMappingURL=Uuid.js.map