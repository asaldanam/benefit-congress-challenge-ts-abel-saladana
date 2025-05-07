import { Lecture, LecturePayload, LectureRepository, LectureSlotFinder } from '../../../domain/Lecture';

export class LectureCreator {
    constructor(
        private deps: {
            lectureRepository: LectureRepository;
        }
    ) {}

    async create(payload: LecturePayload): Promise<Lecture> {
        const { lectureRepository } = this.deps;

        const lectureService = new LectureSlotFinder({ lectureRepository });
        const slot = await lectureService.findNextAvailableSlotByDay(payload);

        const result = await lectureRepository.save({ ...payload, ...slot });
        return result;
    }
}
