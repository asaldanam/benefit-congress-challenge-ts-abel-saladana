import { Uuid } from '../../../@shared/domain';

import { Lecture, LecturePrimitives } from '../../domain/Lecture';
import { LectureRepository } from '../../domain/Lecture/LectureRepository';

export class MemoryLectureRepository implements LectureRepository {
    db = new Map<Uuid, Lecture>();

    async findByCriteria(criteria?: Pick<LecturePrimitives, 'day'>): Promise<Lecture[]> {
        const all = Array.from(this.db.values());

        if (criteria?.day) all.filter((lecture) => lecture.day === criteria.day);

        return all;
    }

    async save(lecture: Lecture): Promise<Lecture> {
        this.db.set(lecture.id, lecture);
        return Promise.resolve(lecture);
    }
}
