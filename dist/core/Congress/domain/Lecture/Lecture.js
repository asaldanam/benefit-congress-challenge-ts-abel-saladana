"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lecture = void 0;
const domain_1 = require("../../../@shared/domain");
class Lecture extends domain_1.Entity {
    constructor(props) {
        super(props);
        Object.assign(this, props);
        this.validate();
    }
    validate() {
        if (!this.title)
            throw new Error('Title is required');
        if (!this.description)
            throw new Error('Description is required');
        if (!this.speakers || this.speakers.length === 0)
            throw new Error('At least one speaker is required');
        if (!this.day)
            throw new Error('Day is required');
        if (!this.duration)
            throw new Error('Duration is required');
        if (!this.room)
            throw new Error('Room is required');
        if (!this.startAt)
            throw new Error('StartAt is required');
    }
}
exports.Lecture = Lecture;
//# sourceMappingURL=Lecture.js.map