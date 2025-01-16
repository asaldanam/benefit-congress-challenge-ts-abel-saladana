"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
// import CongressController from '../controllers/congress.controller';
// import CongressService from '../service/congress.service';
const express = require("express");
const api = require("./api");
const bodyParser = require("body-parser");
const LectureFinder_1 = require("../core/Congress/application/Lecture/Find/LectureFinder");
const Congress_1 = require("../core/Congress");
function createServer(done) {
    const app = express();
    app.use(bodyParser.json());
    // TODO: delete this
    // const congressService = new CongressService();
    // const congressController = new CongressController(congressService);
    // app.get('/lectures', congressController.findAll());
    // app.post('/lectures', congressController.create());
    const lectureRepository = new Congress_1.MemoryLectureRepository();
    app.get('/lectures', api.lectures.GET({ lectureFinder: new LectureFinder_1.LectureFinder({ lectureRepository }) }));
    app.post('/lectures', api.lectures.POST({ lectureSaver: new Congress_1.LectureCreator({ lectureRepository }) }));
    const server = app.listen(5050, done);
    return { app, server };
}
exports.createServer = createServer;
//# sourceMappingURL=server.js.map