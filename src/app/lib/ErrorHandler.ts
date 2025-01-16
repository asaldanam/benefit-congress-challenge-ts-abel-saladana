import { DomainException } from '../../core/@shared/domain';
import { Response } from 'express';

export default class ErrorHandler {
    constructor(private res: Response) {}

    public handle(error: Error) {
        if (error instanceof DomainException) {
            this.res.status(400).json({ error: error.message });
        } else {
            console.error(error);
            this.res.status(500).json({ error: 'Internal server error' });
        }
    }
}
