import { Lecture } from './Lecture';
import { LectureCriteria } from './LectureCriteria';

export interface LectureRepository {
    findByCriteria(criteria?: LectureCriteria): Promise<Lecture[]>;
    save(lecture: Lecture): Promise<Lecture>;
}
