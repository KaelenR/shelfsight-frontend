"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import Link from "next/link";
import type { ActivityItem } from "../types";

const STATUS_DOT: Record<string, string> = {
  success: "bg-brand-sage",
  info: "bg-brand-navy",
  pending: "bg-brand-amber",
  warning: "bg-brand-brick",
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  success: "default",
  info: "outline",
  pending: "secondary",
  warning: "destructive",
};

interface ActivityFeedProps {
  title: string;
  description?: string;
  items: ActivityItem[];
  maxItems?: number;
  showViewAll?: boolean;
  viewAllHref?: string;
  isLoading?: boolean;
}

export function ActivityFeed({
  title,
  description,
  items,
  maxItems = 6,
  showViewAll = false,
  viewAllHref,
  isLoading = false,
}: ActivityFeedProps) {
  const visibleItems = items.slice(0, maxItems);

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-48 mt-1" />
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border/60 last:border-0">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-2 h-2 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {visibleItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="flex items-center justify-between py-3 border-b border-border/60 last:border-0"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[item.status] || "bg-border"}`} />
                <div className="min-w-0">
                  <p className="text-[13px] font-medium truncate">{item.action}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.title}
                    {item.subtitle && <span className="text-muted-foreground/70"> — {item.subtitle}</span>}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                <span className="text-[11px] text-muted-foreground">{item.time}</span>
                <Badge variant={STATUS_VARIANT[item.status] || "outline"} className="text-[10px] px-2 py-0.5">
                  {item.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
        {showViewAll && viewAllHref && (
          <Link
            href={viewAllHref}
            className="block text-center text-xs text-brand-copper hover:text-brand-copper/80 font-medium mt-4 transition-colors"
          >
            View All Activity
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
