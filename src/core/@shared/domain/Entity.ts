import { DomainException } from './DomainException';
import { Uuid } from './Uuid';

export class Entity<Props extends { id: Uuid } = { id: Uuid }> {
    readonly id: Uuid;

    constructor(props: Props) {
        if (!props.id) throw new DomainException('Entity id is required');
        this.id = new Uuid(props.id as any);
    }

    toPrimitives(): Props {
        return Object.keys(this).reduce((acc, key) => {
            if (typeof this[key] !== 'function') {
                acc[key] = this[key];
            }
            return acc;
        }, {} as Props);
    }
}
