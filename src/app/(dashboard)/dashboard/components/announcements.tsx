"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Calendar, Clock, Megaphone } from "lucide-react";
import { motion } from "motion/react";
import type { Announcement } from "../types";

interface AnnouncementsProps {
  announcements: Announcement[];
  isLoading?: boolean;
}

const TYPE_ICON: Record<string, typeof BookOpen> = {
  "new-arrival": BookOpen,
  event: Calendar,
  hours: Clock,
  general: Megaphone,
};

const TYPE_COLOR: Record<string, string> = {
  "new-arrival": "text-brand-sage",
  event: "text-brand-copper",
  hours: "text-brand-amber",
  general: "text-brand-navy",
};

export function Announcements({ announcements, isLoading = false }: AnnouncementsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-3 bg-secondary/60 rounded-xl">
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.4 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-display">
            <Megaphone className="w-4 h-4 text-brand-copper" />
            Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {announcements.map((ann, i) => {
              const Icon = TYPE_ICON[ann.type] || Megaphone;
              const iconColor = TYPE_COLOR[ann.type] || "text-brand-navy";
              return (
                <motion.div
                  key={ann.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.45 + i * 0.05 }}
                  className="p-3 bg-secondary/60 rounded-xl"
                >
                  <div className="flex items-start gap-2.5">
                    <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${iconColor}`} />
                    <div className="min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-[13px] font-medium leading-snug">{ann.title}</p>
                        <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2">{ann.date}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{ann.body}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
