"use client";

import { useAuth } from "@/components/auth-provider";
import { useDashboardState } from "./hooks/use-dashboard-state";
import { AdminDashboard } from "./components/admin-dashboard";
import { StaffDashboard } from "./components/staff-dashboard";
import { PatronDashboard } from "./components/patron-dashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  const dashboard = useDashboardState();
  const name = user?.name?.split(" ")[0] ?? "there";
  const role = user?.role ?? "PATRON";

  switch (role) {
    case "ADMIN":
      return (
        <AdminDashboard
          name={name}
          data={dashboard.adminData}
          circulationRange={dashboard.circulationRange}
          onCirculationRangeChange={dashboard.setCirculationRange}
          overdueBannerDismissed={dashboard.overdueBannerDismissed}
          onDismissOverdueBanner={dashboard.dismissOverdueBanner}
          isLoading={dashboard.isLoading}
        />
      );
    case "STAFF":
      return (
        <StaffDashboard
          name={name}
          data={dashboard.staffData}
          onToggleTask={dashboard.toggleTaskComplete}
          isLoading={dashboard.isLoading}
        />
      );
    case "PATRON":
    default:
      return (
        <PatronDashboard
          name={name}
          data={dashboard.patronData}
          onRenewLoan={dashboard.handleRenewLoan}
          isLoading={dashboard.isLoading}
        />
      );
  }
}
