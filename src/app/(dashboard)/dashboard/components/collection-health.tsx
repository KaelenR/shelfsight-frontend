"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { CollectionCategory } from "../types";

interface CollectionHealthProps {
  categories: CollectionCategory[];
  isLoading?: boolean;
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: CollectionCategory }> }) {
  if (!active || !payload?.length) return null;
  const cat = payload[0].payload;
  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
      <p className="text-xs font-medium">{cat.name}</p>
      <p className="text-[11px] text-muted-foreground">{cat.count.toLocaleString()} books ({cat.percentage}%)</p>
      <p className="text-[11px] text-muted-foreground">Shelf capacity: {cat.capacity}%</p>
    </div>
  );
}

export function CollectionHealth({ categories, isLoading = false }: CollectionHealthProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            <Skeleton className="w-40 h-40 rounded-full" />
            <div className="flex-1 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-3 w-24 mb-1" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const pieData = categories.map((c) => ({ name: c.name, value: c.count, color: c.color }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.5 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Collection Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Donut Chart */}
            <div className="w-full md:w-44 h-44 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="var(--color-background)"
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Shelf Capacity Bars */}
            <div className="flex-1 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Shelf Capacity</p>
              {categories.map((cat) => {
                const barColor =
                  cat.capacity > 90 ? "bg-brand-brick" : cat.capacity > 70 ? "bg-brand-amber" : "bg-brand-sage";
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="text-[12px] font-medium">{cat.name}</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">{cat.capacity}%</span>
                    </div>
                    <Progress
                      value={cat.capacity}
                      className="h-1.5"
                      // Use indicator color based on capacity threshold
                      style={{ ["--progress-color" as string]: undefined }}
                    />
                    <div className={`h-1.5 rounded-full -mt-1.5 ${barColor}`} style={{ width: `${cat.capacity}%` }} />
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
