"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureFinder = void 0;
class LectureFinder {
    constructor(deps) {
        this.deps = deps;
    }
    async findAll() {
        const lectures = await this.deps.lectureRepository.findByCriteria();
        return lectures;
    }
}
exports.LectureFinder = LectureFinder;
//# sourceMappingURL=LectureFinder.js.map