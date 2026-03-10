import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShelfSection } from "@/components/map/types";
import { getCapacityFill, getCapacityLabel, getCapacityPercent } from "@/components/map/utils";

interface ShelfSectionCardProps {
  section: ShelfSection;
}

export function ShelfSectionCard({ section }: ShelfSectionCardProps) {
  const percent = getCapacityPercent(section.used, section.capacity);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{section.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs text-gray-500">Category</p>
          <p className="text-sm font-medium text-gray-900">{section.category}</p>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
            <span>Capacity</span>
            <span>
              {section.used}/{section.capacity}
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${percent}%`, backgroundColor: getCapacityFill(section.used, section.capacity) }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{percent}% full</Badge>
          <Badge className="text-white" style={{ backgroundColor: getCapacityFill(section.used, section.capacity) }}>
            {getCapacityLabel(section.used, section.capacity)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
