import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NextScheduleProps } from "./next-schedule";
import ScheduleItemWrapper from "./schedule-item-wrapper";

const MoreSchedule = ({ schedules, stationName }: NextScheduleProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem className="border-b-0" value="item-1">
        <AccordionTrigger className="hover:underline text-xs text-muted-foreground py-2">
          Lihat Semua
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-4 gap-2">
            {schedules.map((item) => (
              <ScheduleItemWrapper
                key={item.id}
                className="bg-border font-mono font-bold w-full text-center rounded py-2"
                schedule={item}
                stationName={stationName}
              >
                {item.timeEstimated}
              </ScheduleItemWrapper>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default MoreSchedule;
