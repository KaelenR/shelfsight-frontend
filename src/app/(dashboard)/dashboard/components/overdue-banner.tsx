"use client";

import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

interface OverdueBannerProps {
  overdueCount: number;
  totalFines: number;
  onDismiss: () => void;
  isDismissed: boolean;
}

export function OverdueBanner({ overdueCount, totalFines, onDismiss, isDismissed }: OverdueBannerProps) {
  if (overdueCount === 0) return null;

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-6 overflow-hidden"
        >
          <div className="flex items-center gap-3 rounded-xl border border-brand-brick/20 bg-brand-brick/5 px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-brand-brick flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-foreground">
                {overdueCount} overdue item{overdueCount !== 1 ? "s" : ""} — ${totalFines.toFixed(2)} in accumulated fines
              </p>
              <p className="text-[11px] text-muted-foreground">
                Review and send overdue notices from the{" "}
                <Link href="/circulation" className="text-brand-copper hover:underline font-medium">
                  Circulation desk
                </Link>
              </p>
            </div>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 flex-shrink-0" onClick={onDismiss}>
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
