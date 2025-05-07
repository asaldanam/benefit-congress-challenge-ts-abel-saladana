import { Express } from 'express';

import { LectureCreator, MemoryLectureRepository } from '../../../core/Congress';
import { LectureFinder } from '../../../core/Congress/application/Lecture/Find/LectureFinder';
import controller from './controller';

export default class LecturesRoutes {
    readonly path = '/lectures';
    constructor(private app: Express) {}

    public load() {
        const lectureRepository = new MemoryLectureRepository();

        this.app.get(this.path, controller.GET({ lectureFinder: new LectureFinder({ lectureRepository }) }));
        this.app.post(this.path, controller.POST({ lectureCreator: new LectureCreator({ lectureRepository }) }));
    }
}
