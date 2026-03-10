"use client";

import {
  BookOpen,
  Clock,
  AlertCircle,
  ScanLine,
  Settings,
  Library,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";
import type { StaffDashboardData } from "../types";
import { KpiCard } from "./kpi-card";
import { ActivityFeed } from "./activity-feed";
import { TaskChecklist } from "./task-checklist";
import { PendingReturns } from "./pending-returns";

const KPI_ICONS: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-5 h-5 text-brand-navy" />,
  Library: <Library className="w-5 h-5 text-brand-amber" />,
  BookOpen: <BookOpen className="w-5 h-5 text-brand-sage" />,
  AlertCircle: <AlertCircle className="w-5 h-5 text-brand-brick" />,
};

const QUICK_ACTIONS = [
  { href: "/circulation", icon: Clock, label: "Circulation Desk" },
  { href: "/catalog", icon: Library, label: "Browse Catalog" },
  { href: "/ingest", icon: ScanLine, label: "AI Ingest" },
];

interface StaffDashboardProps {
  name: string;
  data: StaffDashboardData;
  onToggleTask: (taskId: string) => void;
  isLoading: boolean;
}

export function StaffDashboard({ name, data, onToggleTask, isLoading }: StaffDashboardProps) {
  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-brand-sage/10 flex items-center justify-center">
            <Settings className="w-5 h-5 text-brand-sage" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-foreground tracking-tight">
            Staff Dashboard
          </h1>
        </div>
        <p className="text-sm text-muted-foreground ml-12">
          Welcome, {name}. Here&apos;s your daily workflow overview.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8"
      >
        {QUICK_ACTIONS.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="group hover:border-brand-copper/40 hover:shadow-md hover:shadow-brand-copper/5 transition-all duration-200 cursor-pointer">
              <CardContent className="py-3.5 px-4 flex items-center gap-3">
                <action.icon className="w-4 h-4 text-brand-copper group-hover:scale-110 transition-transform" />
                <span className="text-[13px] font-medium">{action.label}</span>
                <ArrowRight className="w-3 h-3 ml-auto text-muted-foreground/0 group-hover:text-muted-foreground transition-all" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {data.kpis.map((kpi, i) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            numericValue={kpi.numericValue}
            change={kpi.change}
            changeLabel={kpi.changeLabel}
            trend={kpi.trend}
            sparklineData={kpi.sparklineData}
            icon={KPI_ICONS[kpi.icon] || <BookOpen className="w-5 h-5" />}
            accentColor={kpi.accentColor}
            isLoading={isLoading}
            index={i}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskChecklist
          tasks={data.tasks}
          shiftProgress={data.shiftProgress}
          onToggleTask={onToggleTask}
          isLoading={isLoading}
        />
        <div className="space-y-6">
          <PendingReturns returns={data.pendingReturns} isLoading={isLoading} />
          <ActivityFeed
            title="Recent Circulation"
            description="Latest check-outs, returns & renewals"
            items={data.circulationFeed}
            maxItems={5}
            showViewAll
            viewAllHref="/circulation"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
