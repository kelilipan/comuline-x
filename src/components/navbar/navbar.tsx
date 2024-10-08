import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { IoSearchOutline, IoAdd } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import FilterDrawer from "./filter-drawer";
import AddStationDrawer from "./add-station-drawer";
import debounce from "@/lib/debounce";
import { useStationContext } from "@/contexts/stations-context";
import { useUIContext } from "@/contexts/ui-context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { uiState, handleToggleState } = useUIContext();
  const inputContainerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef(null);
  const { setQuery } = useStationContext();

  useEffect(() => {
    if (uiState.showSearch) {
      inputRef.current?.focus();
    } else {
      setQuery("");
    }
  }, [uiState.showSearch]);

  return (
    <header className="px-3 pt-4 justify-between flex flex-nowrap items-center fixed top-0 w-full max-w-[500px] bg-background z-50">
      <div className="mr-4 w-full h-full relative flex items-center">
        <CSSTransition
          nodeRef={logoRef}
          in={!uiState.showSearch}
          timeout={150}
          classNames="logo"
          unmountOnExit
        >
          <h1
            ref={logoRef}
            className={cn(
              "font-mono font-bold transition-colors visible text-foreground/50 hover:text-foreground",
              "absolute left-0"
            )}
          >
            <Link to="/">Jadwal KRL</Link>
          </h1>
        </CSSTransition>
        <CSSTransition
          nodeRef={inputContainerRef}
          in={uiState.showSearch}
          timeout={150}
          classNames="search"
          unmountOnExit
        >
          <div className="absolute left-0 w-full" ref={inputContainerRef}>
            <IoSearchOutline className="absolute left-2 top-2" />
            <InputComponent ref={inputRef} onValueChange={setQuery} />
          </div>
        </CSSTransition>
      </div>

      <div className="flex gap-2">
        <button
          aria-label="Cari stasiun keberangkatan"
          onClick={() => handleToggleState("showSearch")}
          className={cn(
            "transition-all duration-200 visible text-foreground/50 hover:text-foreground p-1",
            uiState.showSearch && "text-foreground"
          )}
        >
          {uiState.showSearch ? (
            <IoAdd className="size-6 animate-rotate-45" />
          ) : (
            <IoSearchOutline className="size-6" />
          )}
        </button>
        <FilterDrawer
          open={uiState.showFilter}
          onOpenChange={() => handleToggleState("showFilter")}
        />
        <AddStationDrawer
          open={uiState.showAddStation}
          onOpenChange={() => handleToggleState("showAddStation")}
        />
      </div>
    </header>
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
      }, 200),
      []
    );

    return (
      <Input
        ref={ref}
        className="h-8 pl-8 focus-visible:ring-0 focus-visible:bg-border"
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

export default Navbar;
