"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { TASK_STATUS_COLORS } from "../constants";
import type { StaffTask } from "../types";

interface TaskChecklistProps {
  tasks: StaffTask[];
  shiftProgress: { completed: number; total: number };
  onToggleTask: (taskId: string) => void;
  isLoading?: boolean;
}

export function TaskChecklist({ tasks, shiftProgress, onToggleTask, isLoading = false }: TaskChecklistProps) {
  const progressPercent = shiftProgress.total > 0 ? Math.round((shiftProgress.completed / shiftProgress.total) * 100) : 0;

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-3 w-40 mt-1" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-2 w-full rounded-full mb-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border/60 last:border-0">
              <Skeleton className="w-4 h-4 rounded" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-16 ml-auto" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Today&apos;s Tasks</CardTitle>
          <CardDescription className="text-xs">Your shift checklist</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Shift Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-muted-foreground">Shift Progress</span>
              <span className="text-[11px] font-medium">{shiftProgress.completed}/{shiftProgress.total} tasks</span>
            </div>
            <Progress value={progressPercent} className="h-1.5" />
          </div>

          {/* Task List */}
          <div className="space-y-0">
            {tasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.35 + i * 0.04 }}
                className="flex items-center gap-3 py-2.5 border-b border-border/60 last:border-0"
              >
                <Checkbox
                  checked={task.status === "done"}
                  onCheckedChange={() => onToggleTask(task.id)}
                  className="flex-shrink-0"
                />
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${TASK_STATUS_COLORS[task.status] || "bg-border"}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-medium truncate ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>
                    {task.task}
                  </p>
                </div>
                <span className="text-[11px] text-muted-foreground flex-shrink-0">{task.time}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
