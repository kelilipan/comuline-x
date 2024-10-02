import { Capacitor } from "@capacitor/core";
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useStationContext } from "@/contexts/stations-context";
import { cn } from "@/lib/utils";

import StationItem from "./station-item";
import EmptyState from "./empty-state";

const StationList = () => {
  const { filteredStations, query } = useStationContext();
  const isMobile = Capacitor.isNativePlatform() || import.meta.env.DEV;
  return (
    <ScrollArea
      className={cn(
        "mt-12 select-none",
        isMobile ? "h-[calc(100vh-48px-56px)]" : "h-[calc(100vh-48px)]"
      )}
    >
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
