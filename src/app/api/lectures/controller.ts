import { Request, Response } from 'express';

import { LectureCreator } from '../../../core/Congress';
import { LectureFinder } from '../../../core/Congress/application/Lecture/Find/LectureFinder';
import ErrorHandler from '../../lib/ErrorHandler';

const GET = (useCases: { lectureFinder: LectureFinder }) => async (req: Request, res: Response) => {
    try {
        const lectures = await useCases.lectureFinder.findAll();
        res.status(200).json(lectures);
    } catch (error) {
        new ErrorHandler(res).handle(error);
    }
};

const POST = (useCases: { lectureCreator: LectureCreator }) => async (req: Request, res: Response) => {
    try {
        const lecture = await useCases.lectureCreator.create(req.body);
        res.status(201).json(lecture);
    } catch (error) {
        new ErrorHandler(res).handle(error);
    }
};

export default { GET, POST };
