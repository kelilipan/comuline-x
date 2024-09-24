import { cn } from "@/lib/utils";

const StationLoader = () => {
  return (
    <div className="flex animate-pulse flex-col gap-2">
      <div className="flex h-full w-full gap-3">
        <div className={cn("h-[50px] w-[5px] rounded-full bg-foreground/10")} />
        <div className={cn("flex w-full flex-col gap-2")}>
          <div className="flex flex-col gap-1 pb-1 pt-0.5">
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="h-[13px] w-[80px] rounded-md bg-foreground/10" />
              <div className="h-[13px] w-[50px] rounded-md bg-foreground/10" />
            </div>
            <div className="flex items-start justify-between gap-2 ">
              <div className="mt-1 h-[25px] w-[80px] rounded-md bg-foreground/10" />

              <div className="mt-1 h-[25px] w-[70px] rounded-md bg-foreground/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StationLoader;
