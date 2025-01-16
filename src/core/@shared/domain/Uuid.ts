import { DomainException } from './DomainException';

export class Uuid extends String {
    constructor(value: string) {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value)) {
            throw new DomainException('Invalid Uuid format');
        }
        super(value);
    }
}
