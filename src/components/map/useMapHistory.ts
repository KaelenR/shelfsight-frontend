import { useCallback, useRef, useState } from "react";
import type { ShelfFlowNode, HistorySnapshot } from "./types";

const MAX_HISTORY = 50;

export function useMapHistory(initialNodes: ShelfFlowNode[]) {
  const [history, setHistory] = useState<HistorySnapshot[]>([
    { nodes: initialNodes },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // When true, state changes from undo/redo won't push new snapshots
  const isProgrammatic = useRef(false);

  const pushSnapshot = useCallback(
    (nodes: ShelfFlowNode[]) => {
      if (isProgrammatic.current) return;

      setHistory((prev) => {
        // Discard any forward history after the current index
        const truncated = prev.slice(0, currentIndex + 1);
        const next = [...truncated, { nodes }];
        // Cap history length
        if (next.length > MAX_HISTORY) {
          next.shift();
          return next;
        }
        return next;
      });

      setCurrentIndex((prev) =>
        Math.min(prev + 1, MAX_HISTORY - 1)
      );
    },
    [currentIndex]
  );

  const undo = useCallback((): HistorySnapshot | null => {
    if (currentIndex <= 0) return null;
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    return history[newIndex];
  }, [currentIndex, history]);

  const redo = useCallback((): HistorySnapshot | null => {
    if (currentIndex >= history.length - 1) return null;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    return history[newIndex];
  }, [currentIndex, history]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return { pushSnapshot, undo, redo, canUndo, canRedo, isProgrammatic };
}
