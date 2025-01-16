"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const ErrorHandler_1 = require("../../lib/ErrorHandler");
const GET = (useCases) => async (req, res) => {
    try {
        const lectures = await useCases.lectureFinder.findAll();
        res.status(200).json(lectures);
    }
    catch (error) {
        new ErrorHandler_1.default(res).handle(error);
    }
};
exports.GET = GET;
const POST = (useCases) => async (req, res) => {
    try {
        const lecture = await useCases.lectureSaver.save(req.body);
        res.status(201).json(lecture);
    }
    catch (error) {
        new ErrorHandler_1.default(res).handle(error);
    }
};
exports.POST = POST;
//# sourceMappingURL=controller.js.map