"use client";

import {
  BookMarked,
  CalendarClock,
  AlertCircle,
  Star,
  Library,
  Map,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import type { PatronDashboardData } from "../types";
import { KpiCard } from "./kpi-card";
import { CurrentLoans } from "./current-loans";
import { ReadingGoal } from "./reading-goal";
import { ReadingActivity } from "./reading-activity";
import { Announcements } from "./announcements";

const KPI_ICONS: Record<string, React.ReactNode> = {
  BookMarked: <BookMarked className="w-5 h-5 text-brand-navy" />,
  CalendarClock: <CalendarClock className="w-5 h-5 text-brand-amber" />,
  AlertCircle: <AlertCircle className="w-5 h-5 text-brand-brick" />,
  Star: <Star className="w-5 h-5 text-brand-sage" />,
};

const QUICK_ACTIONS = [
  { href: "/catalog", icon: Library, label: "Browse Catalog" },
  { href: "/map", icon: Map, label: "Library Map" },
];

interface PatronDashboardProps {
  name: string;
  data: PatronDashboardData;
  onRenewLoan: (loanId: string) => void;
  isLoading: boolean;
}

export function PatronDashboard({ name, data, onRenewLoan, isLoading }: PatronDashboardProps) {
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
            <BookMarked className="w-5 h-5 text-brand-navy" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-foreground tracking-tight">
            My Library
          </h1>
        </div>
        <p className="text-sm text-muted-foreground ml-12">
          Welcome, {name}. Manage your loans and discover new reads.
        </p>
      </motion.div>

      {/* Fines Banner */}
      {data.fineSummary && data.fineSummary.totalOwed > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.25 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 rounded-xl border border-brand-amber/20 bg-brand-amber/5 px-4 py-3">
            <DollarSign className="w-4 h-4 text-brand-amber flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium">
                Outstanding fines: ${data.fineSummary.totalOwed.toFixed(2)} ({data.fineSummary.itemCount} item{data.fineSummary.itemCount !== 1 ? "s" : ""})
              </p>
              <p className="text-[11px] text-muted-foreground">
                Oldest overdue since {data.fineSummary.oldestDate}. Visit the circulation desk to settle.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid grid-cols-2 gap-3 mb-8"
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
            icon={KPI_ICONS[kpi.icon] || <BookMarked className="w-5 h-5" />}
            accentColor={kpi.accentColor}
            isLoading={isLoading}
            index={i}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <CurrentLoans loans={data.currentLoans} onRenew={onRenewLoan} isLoading={isLoading} />
        </div>
        <div className="space-y-6">
          <ReadingGoal goal={data.readingGoal} isLoading={isLoading} />
          <Announcements announcements={data.announcements} isLoading={isLoading} />
        </div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.45 }}
        className="mb-6"
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-display">
              <Star className="w-4 h-4 text-brand-amber" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.recommendations.map((rec, i) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.5 + i * 0.06 }}
                  className="p-3 bg-secondary/60 rounded-xl"
                >
                  <div className="flex gap-3">
                    <div
                      className="w-8 h-12 rounded flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: `${rec.coverColor}18` }}
                    >
                      <span className="text-[10px] font-bold" style={{ color: rec.coverColor }}>
                        {rec.title.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium truncate">{rec.title}</p>
                      <p className="text-[11px] text-muted-foreground mb-1">by {rec.author}</p>
                      <p className="text-[11px] text-brand-copper font-medium">{rec.reason}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2.5 text-[11px] h-7">
                    Reserve
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reading Activity */}
      <ReadingActivity data={data.readingActivity} isLoading={isLoading} />
    </div>
  );
}
