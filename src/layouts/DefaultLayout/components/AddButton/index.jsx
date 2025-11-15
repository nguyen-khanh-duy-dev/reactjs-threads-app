import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function AddButton() {
  return (
    <Button
      className="text-foreground bg-background hover:bg-background h-18 w-22 cursor-pointer rounded-2xl shadow-2xl transition-transform hover:scale-110 active:scale-95"
      variant="outline"
    >
      <Plus className="h-6! w-6!" strokeWidth={3} />
    </Button>
  );
}

export default AddButton;
