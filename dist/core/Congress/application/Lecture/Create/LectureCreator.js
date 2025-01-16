"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureCreator = void 0;
const Lecture_1 = require("../../../domain/Lecture");
class LectureCreator {
    constructor(deps) {
        this.deps = deps;
    }
    async save(payload) {
        const { lectureRepository } = this.deps;
        const lectureService = new Lecture_1.LectureSlotFinder({ lectureRepository });
        const slot = await lectureService.findNextAvailableSlotByDay(payload);
        const result = await lectureRepository.save({ ...payload, ...slot });
        return result;
    }
}
exports.LectureCreator = LectureCreator;
//# sourceMappingURL=LectureCreator.js.map