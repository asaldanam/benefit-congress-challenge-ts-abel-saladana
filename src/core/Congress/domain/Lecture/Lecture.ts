import { Entity, Uuid } from '../../../@shared/domain';

export interface LecturePrimitives {
    id: Uuid;
    title: string;
    description: string;
    speakers: string[];
    day: 'firstDay' | 'secondDay';
    /** Minutes */
    duration: number;
    room: number;
    /** @format hh:mm */
    startAt: string;
}

export class Lecture extends Entity implements LecturePrimitives {
    readonly title: string;
    readonly description: string;
    readonly speakers: string[];
    readonly day: 'firstDay' | 'secondDay';
    readonly duration: number;
    readonly room: number;
    readonly startAt: string;

    constructor(props: LecturePrimitives) {
        super(props);
        Object.assign(this, props);
        this.validate();
    }

    validate() {
        if (!this.title) throw new Error('Title is required');
        if (!this.description) throw new Error('Description is required');
        if (!this.speakers || this.speakers.length === 0) throw new Error('At least one speaker is required');
        if (!this.day) throw new Error('Day is required');
        if (!this.duration) throw new Error('Duration is required');
        if (!this.room) throw new Error('Room is required');
        if (!this.startAt) throw new Error('StartAt is required');
    }
}
