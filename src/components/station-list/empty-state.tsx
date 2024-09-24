import { Button } from "@/components/ui/button";
import { useUIContext } from "@/contexts/ui-context";
import { IoAdd } from "react-icons/io5";

interface EmptyStateProps {
  notFound?: boolean;
}
const EmptyState = ({ notFound }: EmptyStateProps) => {
  const { handleToggleState } = useUIContext();
  return (
    <div className="mx-4">
      <p className="p-8 mt-4 mb-2 text-sm text-center border-2 border-dashed">
        {notFound ? "Stasiun tidak ditemukan" : "Belum ada stasiun tersimpan"}
      </p>
      {!notFound && (
        <Button
          className="w-full"
          variant="outline"
          size="lg"
          onClick={() => handleToggleState("showAddStation")}
        >
          <IoAdd /> Tambahkan stasiun lain
        </Button>
      )}
    </div>
  );
};
export default EmptyState;
