import { Lecture, LecturePrimitives } from './Lecture';

export interface LectureRepository {
    findByCriteria(criteria?: Pick<LecturePrimitives, 'day'>): Promise<Lecture[]>;
    save(lecture: Lecture): Promise<Lecture>;
}
