"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Uuid_1 = require("./Uuid");
class Entity {
    constructor(props) {
        if (!props.id)
            throw new Error('Entity id is required');
        this.id = new Uuid_1.Uuid(props.id);
    }
    toPrimitives() {
        return Object.keys(this).reduce((acc, key) => {
            if (typeof this[key] !== 'function') {
                acc[key] = this[key];
            }
            return acc;
        }, {});
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map