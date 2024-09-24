import { useState } from "react";

import { IoFunnelOutline } from "react-icons/io5";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { useStationContext } from "@/contexts/stations-context";

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const FilterDrawer = ({ open, onOpenChange }: FilterDrawerProps) => {
  const { sort, sortBy } = useStationContext();
  const [value, setValue] = useState<string>(sort);

  const handleChangeFilter = () => {
    //type check
    sortBy(value === "name" ? "name" : "date");
    onOpenChange(false);
  };
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
    >
      <DrawerTrigger asChild>
        <button
          aria-label="urutkan stasiun"
          className="transition-all duration-200 visible text-foreground/50 hover:text-foreground"
        >
          <IoFunnelOutline className="h-5 w-5" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Urutkan</DrawerTitle>
          <DrawerDescription className="sr-only">
            Urutkan daftar stasiun berdasarkan:
          </DrawerDescription>
        </DrawerHeader>
        <RadioGroup
          value={value}
          onValueChange={setValue}
          className="px-4 py-2 mb-2 gap-0"
        >
          <div className="flex items-center space-x-2 border-b">
            <RadioGroupItem value="name" id="name" />
            <Label className="py-4 w-full" htmlFor="name">
              Nama
            </Label>
          </div>
          <div className="flex items-center space-x-2 border-b">
            <RadioGroupItem value="date" id="date" />
            <Label className="py-4 w-full" htmlFor="date">
              Tanggal ditambahkan
            </Label>
          </div>
        </RadioGroup>
        <DrawerFooter>
          <Button onClick={handleChangeFilter}>Apply</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default FilterDrawer;
