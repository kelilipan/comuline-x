import { Accordion } from "@/components/ui/accordion";
import StationItem from "./station-item";

const StationList = () => {
  return (
    <Accordion type="multiple">
      <StationItem index={1} />
      <StationItem index={2} />
      <StationItem index={3} />
    </Accordion>
  );
};

export default StationList;
