"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Target } from "lucide-react";
import { motion } from "motion/react";
import type { ReadingGoal as ReadingGoalType } from "../types";

interface ReadingGoalProps {
  goal: ReadingGoalType;
  isLoading?: boolean;
}

export function ReadingGoal({ goal, isLoading = false }: ReadingGoalProps) {
  const percentage = Math.min(Math.round((goal.current / goal.target) * 100), 100);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Skeleton className="w-32 h-32 rounded-full" />
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
            <Target className="w-4 h-4 text-brand-sage" />
            {goal.year} Reading Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="8"
              />
              {/* Progress arc */}
              <motion.circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="var(--color-brand-sage)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-display font-semibold tracking-tight">{goal.current}</span>
              <span className="text-[11px] text-muted-foreground">of {goal.target} books</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
