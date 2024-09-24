import { Accordion } from "@/components/ui/accordion";
import StationItem from "./station-item";
import { useStationContext } from "@/contexts/stations-context";
import EmptyState from "./empty-state";

const StationList = () => {
  const { filteredStations } = useStationContext();
  return (
    <Accordion type="multiple">
      {Boolean(filteredStations.length) ? (
        filteredStations.map((item) => <StationItem key={item.id} {...item} />)
      ) : (
        <EmptyState />
      )}
    </Accordion>
  );
};

export default StationList;
