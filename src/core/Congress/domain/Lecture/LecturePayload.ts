import { Lecture } from './Lecture';

export type LecturePayload = Omit<Lecture, 'room' | 'startAt'>;
