import { Button } from "@/components/ui/button";
import { useUIContext } from "@/contexts/ui-context";
import { IoAdd } from "react-icons/io5";

const EmptyState = () => {
  const { handleToggleState } = useUIContext();
  return (
    <div className="mx-4">
      <p className="p-8 mt-4 mb-2 text-sm text-center border-2 border-dashed">
        Belum ada stasiun tersimpan
      </p>
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => handleToggleState("showAddStation")}
      >
        <IoAdd /> Tambahkan stasiun lain
      </Button>
    </div>
  );
};
export default EmptyState;
