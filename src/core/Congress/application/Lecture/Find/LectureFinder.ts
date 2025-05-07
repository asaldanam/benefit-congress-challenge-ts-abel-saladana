import { Lecture, LectureRepository, LectureSlotFinder } from '../../../domain/Lecture';

export class LectureFinder {
    constructor(
        private deps: {
            lectureRepository: LectureRepository;
        }
    ) {}

    async findAll(): Promise<Lecture[]> {
        const lectures = await this.deps.lectureRepository.findByCriteria();

        return lectures;
    }
}
