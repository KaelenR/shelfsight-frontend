"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { generateAdminData, generateStaffData, generatePatronData } from "../mock-data";
import type { CirculationRangePreset, StaffTask } from "../types";

function getInitialTasks(): StaffTask[] {
  return generateStaffData().tasks;
}

export function useDashboardState() {
  const [circulationRange, setCirculationRange] = useState<CirculationRangePreset>("7d");
  const [overdueBannerDismissed, setOverdueBannerDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [staffTasks, setStaffTasks] = useState<StaffTask[]>(getInitialTasks);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const adminData = useMemo(() => generateAdminData(circulationRange), [circulationRange]);

  const staffDataBase = useMemo(() => generateStaffData(), []);

  const staffData = useMemo(() => {
    const completed = staffTasks.filter((t) => t.status === "done").length;
    return {
      ...staffDataBase,
      tasks: staffTasks,
      shiftProgress: { completed, total: staffTasks.length },
    };
  }, [staffDataBase, staffTasks]);

  const patronData = useMemo(() => generatePatronData(), []);

  const dismissOverdueBanner = useCallback(() => {
    setOverdueBannerDismissed(true);
  }, []);

  const toggleTaskComplete = useCallback((taskId: string) => {
    setStaffTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const newStatus = t.status === "done" ? "pending" : "done";
        if (newStatus === "done") {
          toast.success(`Task completed: ${t.task}`);
        }
        return { ...t, status: newStatus };
      }),
    );
  }, []);

  const handleRenewLoan = useCallback((loanId: string) => {
    const loan = patronData.currentLoans.find((l) => l.id === loanId);
    if (loan) {
      toast.success(`Renewed: ${loan.title}`, {
        description: "Due date extended by 14 days.",
      });
    }
  }, [patronData.currentLoans]);

  return {
    adminData,
    staffData,
    patronData,
    circulationRange,
    setCirculationRange,
    overdueBannerDismissed,
    dismissOverdueBanner,
    toggleTaskComplete,
    handleRenewLoan,
    isLoading,
  };
}
