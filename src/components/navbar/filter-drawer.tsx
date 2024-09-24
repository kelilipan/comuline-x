import { IoFunnelOutline } from "react-icons/io5";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const FilterDrawer = ({ open, onOpenChange }: FilterDrawerProps) => {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
    >
      <DrawerTrigger asChild>
        <button className="transition-all duration-200 visible text-foreground/50 hover:text-foreground">
          <IoFunnelOutline className="h-5 w-5" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Urutkan</DrawerTitle>
        </DrawerHeader>
        <RadioGroup
          defaultValue="name"
          onValueChange={console.log}
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
          <Button onClick={() => onOpenChange(false)}>Apply</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default FilterDrawer;
