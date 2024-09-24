import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import NextSchedule from "./next-schedule";
import ScheduleItemWrapper from "./schedule-item-wrapper";

const COLOR = "#E30A16";
const COLOR2 = "#ffc908";
const IS_LAST = true;

interface StationItemProps {
  index: number;
}
const StationItem = ({ index }: StationItemProps) => {
  return (
    <AccordionItem value={"item-" + index}>
      <AccordionTrigger>
        <div className="grid w-full text-left">
          <p className="text-xs text-muted-foreground font-semibold">Stasiun</p>
          <h1 className="text-xl font-bold">Purwosari</h1>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div
          className={cn(
            "pl-4 pb-2 relative",
            `before:block before:z-10 before:absolute before:bg-[var(--line-color)] before:-inset-1 before:rounded before:w-1 before:top-0 before:left-0 before:rounded-b-none`
          )}
          style={{
            //@ts-expect-error tailwind doesn't support arbitrary values from template string so we need to set it using css variables
            "--line-color": COLOR,
          }}
        >
          <div className="flex justify-between">
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Arah menuju</p>
              <h2 className="text-lg">Yogyakarta</h2>
            </div>
            <div className="text-right">
              <ScheduleItemWrapper className="text-right">
                <p className="text-xs text-muted-foreground">Berangkat pukul</p>
                <p className="font-mono text-lg font-medium tracking-tight">
                  15.14
                </p>
                <p className="text-xs opacity-30">dalam 34 menit</p>
              </ScheduleItemWrapper>
            </div>
          </div>
          <NextSchedule />
        </div>
        <hr className="w-full mx-4" />
        <div
          className={cn(
            "pl-4 relative",
            `before:block before:absolute before:bg-[var(--line-color)] before:-inset-1 before:rounded before:w-1 before:top-0 before:left-0`,
            IS_LAST && "before:rounded-b-md before:rounded-t-none pt-2"
          )}
          style={{
            //@ts-expect-error tailwind doesn't support arbitrary values from template string so we need to set it using css variables
            "--line-color": COLOR2,
          }}
        >
          <div className="flex justify-between">
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Arah menuju</p>
              <h2 className="text-lg">Yogyakarta</h2>
            </div>
            <div className="text-right">
              <ScheduleItemWrapper className="text-right">
                <p className="text-xs text-muted-foreground">Berangkat pukul</p>
                <p className="font-mono text-lg font-medium tracking-tight">
                  15.14
                </p>
                <p className="text-xs opacity-30">dalam 34 menit</p>
              </ScheduleItemWrapper>
            </div>
          </div>
          <NextSchedule />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default StationItem;
