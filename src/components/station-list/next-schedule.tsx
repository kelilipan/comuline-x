import { Schedule } from "@/models/schedule";
import ScheduleItemWrapper from "./schedule-item-wrapper";
import { getRelativeTimeString } from "@/lib/date";
export interface NextScheduleProps {
  schedules: Schedule[];
}
const NextSchedule = ({ schedules }: NextScheduleProps) => {
  return (
    <>
      <p className="text-xs mt-2 text-muted-foreground">Jam berikutnya</p>
      <div className="grid grid-cols-2 mt-2">
        {schedules.map((item) => (
          <ScheduleItemWrapper key={item.id}>
            <p className="font-mono text-sm font-semibold">
              {item.timeEstimated}
            </p>
            <p className="text-xs opacity-30">
              {getRelativeTimeString(item.timeEstimated)}
            </p>
          </ScheduleItemWrapper>
        ))}
      </div>
    </>
  );
};

export default NextSchedule;
