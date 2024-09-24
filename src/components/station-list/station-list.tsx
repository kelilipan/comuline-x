import { Accordion } from "@/components/ui/accordion";
import StationItem from "./station-item";
import { useStationContext } from "@/contexts/stations-context";

const StationList = () => {
  const { filteredStations } = useStationContext();
  return (
    <Accordion type="multiple">
      {filteredStations.map((item) => (
        <StationItem key={item.id} {...item} />
      ))}
    </Accordion>
  );
};

export default StationList;
