"use client";

import {
  BookOpen,
  Users,
  Clock,
  AlertCircle,
  ScanLine,
  Map,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";
import type { AdminDashboardData, CirculationRangePreset } from "../types";
import { KpiCard } from "./kpi-card";
import { OverdueBanner } from "./overdue-banner";
import { ActivityFeed } from "./activity-feed";
import { CirculationChart } from "./circulation-chart";
import { CollectionHealth } from "./collection-health";
import { AiInsightsPanel } from "./ai-insights-panel";
import { PopularBooks } from "./popular-books";

const KPI_ICONS: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-5 h-5 text-brand-navy" />,
  Users: <Users className="w-5 h-5 text-brand-sage" />,
  Clock: <Clock className="w-5 h-5 text-brand-amber" />,
  AlertCircle: <AlertCircle className="w-5 h-5 text-brand-brick" />,
};

const QUICK_ACTIONS = [
  { href: "/ingest", icon: ScanLine, label: "AI Ingest" },
  { href: "/map", icon: Map, label: "Library Map" },
  { href: "/members", icon: Users, label: "Manage Members" },
  { href: "/reports", icon: BarChart3, label: "Reports" },
];

interface AdminDashboardProps {
  name: string;
  data: AdminDashboardData;
  circulationRange: CirculationRangePreset;
  onCirculationRangeChange: (range: CirculationRangePreset) => void;
  overdueBannerDismissed: boolean;
  onDismissOverdueBanner: () => void;
  isLoading: boolean;
}

export function AdminDashboard({
  name,
  data,
  circulationRange,
  onCirculationRangeChange,
  overdueBannerDismissed,
  onDismissOverdueBanner,
  isLoading,
}: AdminDashboardProps) {
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
          <div className="w-9 h-9 rounded-xl bg-brand-navy/8 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-brand-navy" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-foreground tracking-tight">
            Admin Dashboard
          </h1>
        </div>
        <p className="text-sm text-muted-foreground ml-12">
          Welcome back, {name}. Full system overview and management controls.
        </p>
      </motion.div>

      {/* Overdue Banner */}
      <OverdueBanner
        overdueCount={data.overdueCount}
        totalFines={data.overdueFinesTotal}
        onDismiss={onDismissOverdueBanner}
        isDismissed={overdueBannerDismissed}
      />

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
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

      {/* Main Content: Chart + Feed | Insights + Popular */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          <CirculationChart
            data={data.circulationTrend}
            range={circulationRange}
            onRangeChange={onCirculationRangeChange}
            isLoading={isLoading}
          />
          <ActivityFeed
            title="System Activity"
            description="All user actions across the system"
            items={data.activityFeed}
            maxItems={6}
            showViewAll
            viewAllHref="/reports"
            isLoading={isLoading}
          />
        </div>
        <div className="space-y-6">
          <AiInsightsPanel insights={data.aiInsights} isLoading={isLoading} />
          <PopularBooks books={data.popularBooks} isLoading={isLoading} />
        </div>
      </div>

      {/* Collection Health */}
      <CollectionHealth categories={data.collectionHealth} isLoading={isLoading} />
    </div>
  );
}
