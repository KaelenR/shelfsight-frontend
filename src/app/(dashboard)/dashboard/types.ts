export type ActivityStatus = "success" | "info" | "pending" | "warning";
export type TaskStatus = "done" | "in-progress" | "pending";
export type LoanStatus = "on-time" | "due-soon" | "overdue";
export type InsightPriority = "high" | "medium" | "low";
export type CirculationRangePreset = "7d" | "14d" | "30d";

export interface DashboardKpi {
  label: string;
  value: string;
  numericValue: number;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "flat";
  sparklineData: number[];
  accentColor: string;
  icon: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  title: string;
  subtitle?: string;
  time: string;
  status: ActivityStatus;
}

export interface AiInsight {
  id: string;
  title: string;
  description: string;
  priority: InsightPriority;
  actionLabel?: string;
  actionHref?: string;
}

export interface PopularBook {
  rank: number;
  title: string;
  author: string;
  checkouts: number;
  trend: "up" | "down" | "flat";
}

export interface StaffTask {
  id: string;
  task: string;
  status: TaskStatus;
  time: string;
}

export interface PendingReturn {
  id: string;
  bookTitle: string;
  patronName: string;
  dueDate: string;
  isOverdue: boolean;
}

export interface PatronLoan {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  dueDate: string;
  daysLeft: number;
  status: LoanStatus;
  progress: number;
}

export interface PatronRecommendation {
  id: string;
  title: string;
  author: string;
  reason: string;
  coverColor: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  type: "new-arrival" | "event" | "hours" | "general";
}

export interface ReadingGoal {
  target: number;
  current: number;
  year: number;
}

export interface CirculationTrendPoint {
  date: string;
  label: string;
  checkouts: number;
  returns: number;
}

export interface CollectionCategory {
  name: string;
  count: number;
  color: string;
  percentage: number;
  capacity: number;
}

export interface ReadingActivityPoint {
  month: string;
  books: number;
}

export interface FineSummary {
  totalOwed: number;
  itemCount: number;
  oldestDate: string;
}

export interface AdminDashboardData {
  kpis: DashboardKpi[];
  circulationTrend: CirculationTrendPoint[];
  collectionHealth: CollectionCategory[];
  activityFeed: ActivityItem[];
  aiInsights: AiInsight[];
  popularBooks: PopularBook[];
  overdueCount: number;
  overdueFinesTotal: number;
}

export interface StaffDashboardData {
  kpis: DashboardKpi[];
  tasks: StaffTask[];
  circulationFeed: ActivityItem[];
  pendingReturns: PendingReturn[];
  shiftProgress: { completed: number; total: number };
}

export interface PatronDashboardData {
  kpis: DashboardKpi[];
  currentLoans: PatronLoan[];
  readingActivity: ReadingActivityPoint[];
  recommendations: PatronRecommendation[];
  fineSummary: FineSummary | null;
  announcements: Announcement[];
  readingGoal: ReadingGoal;
}
