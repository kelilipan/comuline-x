import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Loader, RefreshCcw } from "lucide-react";

import { getRelativeTimeString } from "@/lib/date";
import groupScheduleByDestination from "@/lib/group-schedule-by-line-and-destination";
import { cn } from "@/lib/utils";

import type { Station } from "@/models/station";
import type { Schedule } from "@/models/schedule";
import type { APIResponse } from "@/models/response";

import MoreSchedule from "./more-schedule";
import NextSchedule from "./next-schedule";
import ScheduleItemWrapper from "./schedule-item-wrapper";
import StationLoader from "./station-item.loader";

const StationItem = ({ id, name }: Station) => {
  const { data, isLoading, error, mutate } = useSWR<APIResponse<Schedule[]>>(
    `/api/v1/schedule/${id}`
  );

  const [refreshInterval, setRefreshInterval] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // This forces a re-render every 60 seconds, to update latest station & relative time
      setRefreshInterval((prev) => prev + 1);
    }, 60000); // 60,000 milliseconds = 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  const groupedSchedules = useMemo(() => {
    if (!data?.data) return {};
    return groupScheduleByDestination(data.data);
  }, [data, refreshInterval]);

  const lines = Object.keys(groupedSchedules);
  const { isEmpty: isScheduleEmpty } = groupedSchedules;

  return (
    <AccordionItem value={"item-" + id}>
      <AccordionTrigger headerClasName="sticky top-0 px-4 bg-background z-10 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="grid w-full text-left">
          <p className="text-xs text-muted-foreground font-semibold">Stasiun</p>
          <h1 className="text-xl font-bold capitalize">
            {name.toLowerCase()}{" "}
            {isLoading ? (
              <Loader size={16} className="animate-spin opacity-50 inline" />
            ) : error ? (
              <RefreshCcw
                aria-label="terjadi kesalahan, klik untuk coba lagi"
                size={16}
                onClick={() => mutate()}
                className="opacity-50 inline"
              />
            ) : null}
          </h1>
        </div>
      </AccordionTrigger>
      <AccordionContent className="box-border divide-y divide-solid pl-8 pr-4">
        {isLoading && <StationLoader />}
        {!isLoading && isScheduleEmpty && (
          <p className="text-sm opacity-50 -ml-4">
            Jadwal kereta api tidak tersedia. Cek lagi pada esok hari.
          </p>
        )}
        {!isScheduleEmpty &&
          lines.map((lineKey) => {
            const [line, color] = lineKey.split("-");
            const destinations = Object.keys(groupedSchedules[lineKey]).sort(
              (a, b) => a.localeCompare(b)
            );

            return destinations.map((destinationKey) => {
              const scdedulesByDestination =
                groupedSchedules[lineKey][destinationKey] ?? [];

              const [firstSchedule, ...nextSchedules] =
                scdedulesByDestination.slice(0, 5); //return first 5
              const moreSchedule = scdedulesByDestination.slice(5); //moooore schedules

              if (typeof firstSchedule === "undefined") return null;

              return (
                <div
                  key={`${lineKey}-${destinationKey}`}
                  className={cn(
                    "relative pt-2",
                    `before:absolute before:bg-[var(--line-color)] before:-inset-1 before:w-1 before:top-0 before:-left-4 before:z-[1]`,
                    "first:before:rounded-t last:before:rounded-b"
                  )}
                  style={{
                    //@ts-expect-error tailwind doesn't support arbitrary values from template string so we need to set it using css variables
                    "--line-color": color,
                  }}
                >
                  <div className="flex justify-between">
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">
                        Arah menuju
                      </p>
                      <h2 className="text-lg font-semibold capitalize">
                        {firstSchedule?.destination.toLowerCase()}
                      </h2>{" "}
                      <p className="opacity-30 text-xs">
                        {line} ({firstSchedule?.trainId})
                      </p>
                    </div>
                    <div className="text-right">
                      <ScheduleItemWrapper
                        className="text-right"
                        schedule={firstSchedule}
                        stationName={name}
                      >
                        <p className="text-xs text-muted-foreground">
                          Berangkat pukul
                        </p>
                        <p className="font-mono text-lg font-medium tracking-tight">
                          {firstSchedule?.timeEstimated}
                        </p>
                        <p className="text-xs opacity-30">
                          {getRelativeTimeString(firstSchedule?.timeEstimated)}
                        </p>
                      </ScheduleItemWrapper>
                    </div>
                  </div>
                  {Boolean(nextSchedules.length) && (
                    <NextSchedule
                      schedules={nextSchedules}
                      stationName={name}
                    />
                  )}
                  {Boolean(moreSchedule.length) && (
                    <MoreSchedule schedules={moreSchedule} stationName={name} />
                  )}
                </div>
              );
            });
          })}
      </AccordionContent>
    </AccordionItem>
  );
};

export default StationItem;
