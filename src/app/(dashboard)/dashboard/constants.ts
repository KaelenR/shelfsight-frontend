import { CHART_COLORS, ACCENT_HEX_MAP } from "../reports/constants";

export { CHART_COLORS, ACCENT_HEX_MAP };

export const CIRCULATION_RANGE_OPTIONS = [
  { value: "7d" as const, label: "7 Days" },
  { value: "14d" as const, label: "14 Days" },
  { value: "30d" as const, label: "30 Days" },
];

export const TASK_STATUS_COLORS: Record<string, string> = {
  done: "bg-brand-sage",
  "in-progress": "bg-brand-amber",
  pending: "bg-border",
};

export const LOAN_STATUS_CONFIG: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
  "on-time": { variant: "outline", label: "On Time" },
  "due-soon": { variant: "secondary", label: "Due Soon" },
  overdue: { variant: "destructive", label: "Overdue" },
};
