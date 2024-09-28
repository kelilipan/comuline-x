import type { PropsWithChildren } from "react";
import { Capacitor } from "@capacitor/core";
import { cn } from "@/lib/utils";
import type { Schedule } from "@/models/schedule";
import SetScheduleDrawer from "../set-schedule-drawer";

interface ScheduleItemWrapperProps extends PropsWithChildren {
  className?: string;
  schedule: Schedule;
  stationName: string;
}

const ScheduleItemWrapper = ({
  children,
  className,
  schedule,
  stationName,
}: ScheduleItemWrapperProps) => {
  const isMobile = Capacitor.isNativePlatform() || true;

  if (isMobile) {
    return (
      <SetScheduleDrawer schedule={schedule} stationName={stationName}>
        <button
          className={cn(
            "transition-all hover:bg-foreground/10 focus:bg-foreground/10 text-left p-1 w-fit rounded cursor:pointer",
            className
          )}
        >
          {children}
        </button>
      </SetScheduleDrawer>
    );
  }
  return <div className={cn("p-1", className)}>{children}</div>;
};

export default ScheduleItemWrapper;
