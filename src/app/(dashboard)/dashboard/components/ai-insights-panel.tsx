"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { AiInsight } from "../types";

interface AiInsightsPanelProps {
  insights: AiInsight[];
  isLoading?: boolean;
}

const PRIORITY_ICON: Record<string, typeof AlertTriangle> = {
  high: AlertTriangle,
  medium: Lightbulb,
  low: Lightbulb,
};

const PRIORITY_VARIANT: Record<string, "destructive" | "default" | "secondary"> = {
  high: "destructive",
  medium: "default",
  low: "secondary",
};

export function AiInsightsPanel({ insights, isLoading = false }: AiInsightsPanelProps) {
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
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-2/3" />
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
      transition={{ duration: 0.35, delay: 0.35 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-display">
            <Lightbulb className="w-4 h-4 text-brand-copper" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map((insight, i) => {
              const Icon = PRIORITY_ICON[insight.priority] || Lightbulb;
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.4 + i * 0.06 }}
                  className="p-3 bg-secondary/60 rounded-xl"
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${insight.priority === "high" ? "text-brand-brick" : "text-brand-copper"}`} />
                      <p className="text-[13px] font-medium leading-snug">{insight.title}</p>
                    </div>
                    <Badge variant={PRIORITY_VARIANT[insight.priority]} className="text-[10px] px-2 py-0.5 ml-2 flex-shrink-0">
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed ml-5.5">{insight.description}</p>
                  {insight.actionLabel && insight.actionHref && (
                    <Link href={insight.actionHref}>
                      <Button variant="ghost" size="sm" className="h-6 text-[11px] px-2 mt-2 ml-4 text-brand-copper hover:text-brand-copper/80">
                        {insight.actionLabel}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
