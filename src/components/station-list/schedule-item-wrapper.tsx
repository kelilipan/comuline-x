import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
interface ScheduleItemWrapperProps extends PropsWithChildren {
  className?: string;
}
const ScheduleItemWrapper = ({
  children,
  className,
}: ScheduleItemWrapperProps) => {
  const isMobile = true;
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
  return <div className="p-1">{children}</div>;
};

export default ScheduleItemWrapper;
