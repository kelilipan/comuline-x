import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useStationContext } from "@/contexts/stations-context";
import { cn } from "@/lib/utils";

import StationItem from "./station-item";
import EmptyState from "./empty-state";

const StationList = () => {
  const { filteredStations, query } = useStationContext();
  return (
    <ScrollArea className={cn("mt-12 select-none h-[calc(100vh-48px-56px)]")}>
      <Accordion type="multiple" className="pb-16">
        {Boolean(filteredStations.length) ? (
          filteredStations.map((item) => (
            <StationItem key={item.id} {...item} />
          ))
        ) : (
          <EmptyState notFound={Boolean(query)} />
        )}
      </Accordion>
    </ScrollArea>
  );
};

export default StationList;
