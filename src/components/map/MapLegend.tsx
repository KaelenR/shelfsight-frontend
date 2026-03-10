export function MapLegend() {
  return (
    <div className="absolute left-4 top-4 z-10 rounded-lg border border-gray-200 bg-white/95 p-3 shadow-sm">
      <p className="mb-2 text-xs font-semibold text-gray-700">Capacity Legend</p>
      <div className="space-y-1 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-green-600" />
          <span>Good (&lt; 75%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-orange-500" />
          <span>Medium (75-90%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-600" />
          <span>High (&gt; 90%)</span>
        </div>
      </div>
    </div>
  );
}
