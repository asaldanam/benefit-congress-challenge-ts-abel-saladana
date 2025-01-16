export class DomainException extends Error {
    constructor(message: string, readonly cause?: Record<string, any>) {
        super(message);
        this.name = 'DomainException';
    }
}
