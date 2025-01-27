// import CongressController from '../controllers/congress.controller';
// import CongressService from '../service/congress.service';
import * as express from 'express';

import bodyParser = require('body-parser');
import { LectureFinder } from '../core/Congress/application/Lecture/Find/LectureFinder';
import { LectureCreator, MemoryLectureRepository } from '../core/Congress';
import LecturesRoutes from './api/lectures/routes';

export function createServer(done) {
    const app = express();
    app.use(bodyParser.json());

    new LecturesRoutes(app).load();

    const server = app.listen(5050, done);

    return { app, server };
}
