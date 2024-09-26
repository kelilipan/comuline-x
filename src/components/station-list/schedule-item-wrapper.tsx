import type { PropsWithChildren } from "react";
import { Capacitor } from "@capacitor/core";
import { cn } from "@/lib/utils";

interface ScheduleItemWrapperProps extends PropsWithChildren {
  className?: string;
}

const ScheduleItemWrapper = ({
  children,
  className,
}: ScheduleItemWrapperProps) => {
  const isMobile = Capacitor.isNativePlatform();

  if (isMobile) {
    return (
      <button
        className={cn(
          "transition-all hover:bg-foreground/10 focus:bg-foreground/10 text-left p-1 w-fit rounded cursor:pointer",
          className
        )}
      >
        {children}
      </button>
    );
  }
  return <div className={cn("p-1", className)}>{children}</div>;
};

export default ScheduleItemWrapper;
