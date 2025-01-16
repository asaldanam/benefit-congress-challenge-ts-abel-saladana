"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureSlotFinder = void 0;
const domain_1 = require("../../../@shared/domain");
class LectureSlotFinder {
    constructor(deps) {
        this.deps = deps;
        this.timeslots = {
            firstDay: {
                starts: new Date().setHours(10, 0),
                ends: new Date().setHours(18, 0)
            },
            secondDay: {
                starts: new Date().setHours(10, 0),
                ends: new Date().setHours(15, 0)
            }
        };
    }
    /** PUBLIC */
    async findNextAvailableSlotByDay(params) {
        const { lectureRepository } = this.deps;
        const lectures = await lectureRepository.findByCriteria({ day: params.day });
        const durationTime = params.duration * 60000;
        const timeslot = this.timeslots[params.day];
        const totalDayDuration = timeslot.ends - timeslot.starts;
        if (durationTime > totalDayDuration) {
            throw new domain_1.DomainException(`The duration of the lecture is greater than the total day duration of ${totalDayDuration / 60000} minutes for ${params.day}`);
        }
        let currentRoom = 1;
        let currentTime = timeslot.starts;
        const lecturesSortedByStartAt = lectures.sort((a, b) => a.startAt.localeCompare(b.startAt));
        for (const lecture of lecturesSortedByStartAt) {
            const lectureDurationTime = lecture.duration * 60000;
            const startTime = this.parseTime(lecture.startAt);
            const endTime = startTime + lectureDurationTime;
            if (currentTime < startTime) {
                if (currentTime + durationTime <= timeslot.ends) {
                    return { startAt: this.formatTime(currentTime), room: currentRoom };
                }
                else {
                    currentRoom++;
                    currentTime = timeslot.starts;
                }
            }
            currentTime = endTime;
            if (currentTime > timeslot.ends) {
                currentRoom++;
                currentTime = timeslot.starts;
            }
        }
        if (currentTime + durationTime <= timeslot.ends) {
            return { startAt: this.formatTime(currentTime), room: currentRoom };
        }
        return { startAt: this.formatTime(timeslot.starts), room: currentRoom + 1 };
    }
    /** PRIVATE */
    parseTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return new Date().setHours(hours, minutes);
    }
    formatTime(time) {
        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
}
exports.LectureSlotFinder = LectureSlotFinder;
//# sourceMappingURL=LectureSlotFinder.js.map