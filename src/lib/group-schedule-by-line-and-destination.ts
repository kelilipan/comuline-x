import type { GroupedSchedule, Schedule } from "@/models/schedule";

const _formatEstimatedTime = (time: string) => {
  return time.split(":").slice(0, 2).join(".");
};

//@todo: will refactor this to more readable
const groupScheduleByLineAndDestination = (
  schedules: Schedule[]
): GroupedSchedule => {
  return schedules.reduce((acc: GroupedSchedule, obj) => {
    const lineKey = `${obj.line}-${obj.color}`;
    const destKey = obj.destination;

    const lineKeyRecord = acc[lineKey] ?? {};
    const destKeyArray = lineKeyRecord[destKey] ?? [];

    destKeyArray.push({
      ...obj,
      timeEstimated: _formatEstimatedTime(obj.timeEstimated),
      destinationTime: _formatEstimatedTime(obj.destinationTime),
    });

    lineKeyRecord[destKey] = destKeyArray;
    acc[lineKey] = lineKeyRecord;
    return acc;
  }, {});
};
export default groupScheduleByLineAndDestination;
