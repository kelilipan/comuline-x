import { useMemo } from "react";
import useSWR from "swr";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { getRelativeTimeString } from "@/lib/date";
import groupScheduleByDestination from "@/lib/group-schedule-by-line-and-destination";
import { cn } from "@/lib/utils";

import type { Station } from "@/models/station";
import type { Schedule } from "@/models/schedule";
import type { APIResponse } from "@/models/response";

import MoreSchedule from "./more-schedule";
import NextSchedule from "./next-schedule";
import ScheduleItemWrapper from "./schedule-item-wrapper";

const StationItem = ({ id, name }: Station) => {
  const { data } = useSWR<APIResponse<Schedule[]>>(
    `/v1/schedule/${id}?is_from_now=true`
  );

  const groupedSchedules = useMemo(() => {
    if (!data?.data) return {};
    return groupScheduleByDestination(data.data);
  }, [data]);
  const lines = Object.keys(groupedSchedules);
  console.log({ groupedSchedules });

  return (
    <AccordionItem value={"item-" + id}>
      <AccordionTrigger headerClasName="sticky top-0 px-4 bg-background z-10 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="grid w-full text-left">
          <p className="text-xs text-muted-foreground font-semibold">Stasiun</p>
          <h1 className="text-xl font-bold capitalize">{name.toLowerCase()}</h1>
        </div>
      </AccordionTrigger>
      <AccordionContent className="box-border">
        {lines.map((lineKey, idx) => {
          const [line, color] = lineKey.split("-");
          const destinations = Object.keys(groupedSchedules[lineKey]).sort(
            (a, b) => a.localeCompare(b)
          );
          return destinations.map((destinationKey, destinationIdx) => {
            const scdedulesByDestination =
              groupedSchedules[lineKey][destinationKey];

            const [firstSchedule, ...nextSchedules] =
              scdedulesByDestination.slice(0, 5); //return first 5

            const moreSchedule = scdedulesByDestination.slice(5); //moooore schedules

            const isLastLine = idx === lines.length - 1;
            const isLastSchedule = destinationIdx === destinations.length - 1;

            return (
              <div
                key={`${lineKey}-${destinationKey}`}
                className={cn(
                  "pl-8 pr-4 relative py-2",
                  `before:absolute before:bg-[var(--line-color)] before:-inset-1 before:rounded before:w-1 before:top-0 before:left-4`,
                  isLastLine &&
                    lines.length !== 1 &&
                    "before:rounded-b-md before:rounded-t-none pt-2"
                )}
                style={{
                  //@ts-expect-error tailwind doesn't support arbitrary values from template string so we need to set it using css variables
                  "--line-color": color,
                }}
              >
                <div className="flex justify-between">
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Arah menuju</p>
                    <h2 className="text-lg capitalize">
                      {firstSchedule.destination.toLowerCase()}
                    </h2>{" "}
                    <p className="opacity-30 text-xs">
                      {line} ({firstSchedule.trainId})
                    </p>
                  </div>
                  <div className="text-right">
                    <ScheduleItemWrapper className="text-right">
                      <p className="text-xs text-muted-foreground">
                        Berangkat pukul
                      </p>
                      <p className="font-mono text-lg font-medium tracking-tight">
                        {firstSchedule.timeEstimated}
                      </p>
                      <p className="text-xs opacity-30">
                        {getRelativeTimeString(firstSchedule.timeEstimated)}
                      </p>
                    </ScheduleItemWrapper>
                  </div>
                </div>
                {Boolean(nextSchedules.length) && (
                  <NextSchedule schedules={nextSchedules} />
                )}
                {Boolean(moreSchedule.length) && (
                  <MoreSchedule schedules={moreSchedule} />
                )}
                {!(isLastLine && isLastSchedule) && <hr />}
              </div>
            );
          });
        })}
      </AccordionContent>
    </AccordionItem>
  );
};

export default StationItem;
