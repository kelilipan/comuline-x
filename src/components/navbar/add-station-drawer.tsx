import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IoAdd, IoClose, IoSearchOutline } from "react-icons/io5";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { stations_temp } from "./testdata";
import { Station } from "@/models/station";
import debounce from "@/lib/debounce";

interface AddStationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddStationDrawer = ({ open, onOpenChange }: AddStationDrawerProps) => {
  const [selectedStation, setSelectedStatus] = useState<Station[]>([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredStation = useMemo(() => {
    return stations_temp.data.filter(
      (station) =>
        station.name.toLowerCase().includes(query.toLowerCase()) &&
        !selectedStation.some((selected) => selected.id === station.id)
    );
  }, [stations_temp.data, query, selectedStation]);

  const handleAddStation = (value: Station) => {
    setSelectedStatus((prev) =>
      [...prev, value].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const handleRemoveStation = (id: Station["id"]) => {
    setSelectedStatus((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
      closeThreshold={0.35}
    >
      <DrawerTrigger asChild>
        <button className="transition-all duration-200 visible text-foreground/50 hover:text-foreground">
          <IoAdd
            className={cn(
              "h-5 w-5 transition-transform",
              open ? "rotate-45" : "rotate-0"
            )}
          />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Tambahkan Stasiun</DrawerTitle>
        </DrawerHeader>
        <div className="h-[75vh] w-full box-content">
          <div className="relative w-full border-b">
            <IoSearchOutline className="absolute left-2 top-2" />
            <InputComponent ref={inputRef} onValueChange={setQuery} />
          </div>
          <div className="flex flex-col h-full overflow-auto w-full mt-2">
            <span className="text-muted-foreground text-sm mx-2">
              Tersimpan
            </span>
            {selectedStation.map((item) => (
              <Button
                variant="ghost"
                className="flex w-full rounded-none justify-start capitalize hover:bg-destructive/90"
                onClick={() => handleRemoveStation(item.id)}
              >
                {item.name.toLocaleLowerCase()}
                <IoClose className="ml-auto" />
              </Button>
            ))}
            <hr className="mt-2 mb-4" />

            <span className="text-muted-foreground text-sm mx-2">
              Belum Tersimpan
            </span>

            {filteredStation.map((item) => (
              <Button
                variant="ghost"
                className="flex w-full rounded-none justify-start capitalize"
                onClick={() => handleAddStation(item)}
              >
                {item.name.toLocaleLowerCase()}
              </Button>
            ))}
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={() => onOpenChange(false)}>Apply</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

//input component to isolate rerenders and to do debounce function
interface InputComponentProps {
  onValueChange: (value: string) => void;
}
const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  ({ onValueChange }, ref) => {
    const [value, setValue] = useState("");
    const handleInputChange = useCallback(
      debounce((value: string) => {
        onValueChange(value);
      }, 300),
      []
    );
    return (
      <Input
        ref={ref}
        className="h-8 pl-8 border-0 rounded-none focus-visible:ring-0 focus-visible:bg-border"
        placeholder="Cari stasiun keberangkatan"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          //debounce value
          handleInputChange(e.target.value);
        }}
      />
    );
  }
);

export default AddStationDrawer;
