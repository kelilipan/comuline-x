import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

import StationItem from "./station-item";
import { useStationContext } from "@/contexts/stations-context";
import EmptyState from "./empty-state";

const StationList = () => {
  const { filteredStations, query } = useStationContext();
  return (
    <ScrollArea className="h-[calc(100vh-56px)] pb-8">
      <Accordion type="multiple">
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
