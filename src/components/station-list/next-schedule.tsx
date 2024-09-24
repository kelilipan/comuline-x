import ScheduleItemWrapper from "./schedule-item-wrapper";

const NextSchedule = () => {
  return (
    <>
      <p className="text-xs mt-2 text-muted-foreground">Jam berikutnya</p>
      <div className="grid grid-cols-2 mt-2">
        <ScheduleItemWrapper>
          <p className="font-mono text-sm font-semibold">16.30</p>
          <p className="text-xs opacity-30">dalam 1 jam</p>
        </ScheduleItemWrapper>
        <ScheduleItemWrapper>
          <p className="font-mono text-sm font-semibold">17.26</p>
          <p className="text-xs opacity-30">dalam 2 jam</p>
        </ScheduleItemWrapper>
        <ScheduleItemWrapper>
          <p className="font-mono text-sm font-semibold">17.41</p>
          <p className="text-xs opacity-30">dalam 2 jam</p>
        </ScheduleItemWrapper>
        <ScheduleItemWrapper>
          <p className="font-mono text-sm font-semibold">18.32</p>
          <p className="text-xs opacity-30">dalam 3 jam</p>
        </ScheduleItemWrapper>
      </div>
    </>
  );
};

export default NextSchedule;
