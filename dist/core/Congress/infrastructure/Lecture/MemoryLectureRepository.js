"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryLectureRepository = void 0;
class MemoryLectureRepository {
    constructor() {
        this.db = new Map();
    }
    async findByCriteria(criteria) {
        const all = Array.from(this.db.values());
        if (criteria?.day)
            all.filter((lecture) => lecture.day === criteria.day);
        return all;
    }
    async save(lecture) {
        this.db.set(lecture.id, lecture);
        return Promise.resolve(lecture);
    }
}
exports.MemoryLectureRepository = MemoryLectureRepository;
//# sourceMappingURL=MemoryLectureRepository.js.map