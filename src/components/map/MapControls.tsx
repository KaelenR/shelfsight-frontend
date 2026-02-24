import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapViewMode } from "@/components/map/types";

interface MapControlsProps {
  viewMode: MapViewMode;
  hasSelection: boolean;
  onZoomIn: () => void;
  onBackToMap: () => void;
}

export function MapControls({ viewMode, hasSelection, onZoomIn, onBackToMap }: MapControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant={viewMode === "shelf" ? "secondary" : "outline"} size="sm" onClick={onZoomIn} disabled={!hasSelection}>
        <Plus className="h-4 w-4" />
        Zoom In
      </Button>
      <Button variant={viewMode === "map" ? "secondary" : "outline"} size="sm" onClick={onBackToMap}>
        <Minus className="h-4 w-4" />
        Full Map
      </Button>
    </div>
  );
}
