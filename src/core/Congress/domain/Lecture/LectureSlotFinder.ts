import { DomainException } from '../../../@shared/domain';
import { Lecture, LecturePrimitives } from './Lecture';
import { LectureRepository } from './LectureRepository';

type Slot = Pick<Lecture, 'startAt' | 'room'>;
const msInMinute = 60_000;

export class LectureSlotFinder {
    readonly timeslots: { [D in LecturePrimitives['day']]: { starts: number; ends: number } } = {
        firstDay: {
            starts: new Date().setHours(10, 0),
            ends: new Date().setHours(18, 0)
        },
        secondDay: {
            starts: new Date().setHours(10, 0),
            ends: new Date().setHours(15, 0)
        }
    };

    constructor(
        private deps: {
            lectureRepository: LectureRepository;
        }
    ) {}

    /** PUBLIC */

    async findNextAvailableSlotByDay(params: Pick<Lecture, 'day' | 'duration'>): Promise<Slot> {
        const lectures = await this.deps.lectureRepository.findByCriteria({ day: params.day });

        const timeslot = this.timeslots[params.day];
        const durationTime = params.duration * msInMinute;

        this.validateLectureDuration({ durationTime, day: params.day });

        const lecturesSortedByStartAt = lectures.sort((a, b) => a.startAt.localeCompare(b.startAt));

        let currentRoom = 1;
        let currentTime = timeslot.starts;

        // Iterates over the lectures sorted by start time to find the next available slot
        for (const lecture of lecturesSortedByStartAt) {
            const lectureDurationTime = lecture.duration * msInMinute;

            const startTime = this.parseTime(lecture.startAt);
            const endTime = startTime + lectureDurationTime;

            const isAvailableSlot = currentTime < startTime && currentTime + durationTime <= timeslot.ends;

            // If there is a slot available between the current time and the start time of the lecture
            if (isAvailableSlot) return { startAt: this.formatTime(currentTime), room: currentRoom };

            // If the current time is less than the end time of the lecture
            currentTime = endTime;

            // currentRoom is full
            if (currentTime >= timeslot.ends) {
                currentRoom++;
                currentTime = timeslot.starts;
            }
        }

        // If there is a slot available between the current time and the end time of the day, set the slot
        if (currentTime + durationTime <= timeslot.ends) {
            return { startAt: this.formatTime(currentTime), room: currentRoom };
        }

        // If there is a slot available between the start time of the day and the start time of the first lecture
        return { startAt: this.formatTime(timeslot.starts), room: currentRoom + 1 };
    }

    /** PRIVATE */

    private validateLectureDuration(props: { durationTime: number; day: Lecture['day'] }) {
        const { durationTime, day } = props;
        const timeslot = this.timeslots[day];
        const totalDayDuration = timeslot.ends - timeslot.starts;
        const totalDayDurationMin = totalDayDuration / msInMinute;

        if (durationTime > totalDayDuration) {
            throw new DomainException(
                `The duration of the lecture is greater than the total day duration of ${totalDayDurationMin} minutes for ${day}`
            );
        }
    }

    private parseTime(time: string): number {
        const [hours, minutes] = time.split(':').map(Number);
        return new Date().setHours(hours, minutes);
    }

    private formatTime(time: number): string {
        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
}
