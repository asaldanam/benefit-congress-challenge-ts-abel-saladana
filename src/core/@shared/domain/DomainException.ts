export class DomainException extends Error {
    constructor(readonly message: string, readonly cause?: Record<string, any>) {
        super(message);
        this.name = 'DomainException';
    }
}
