"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const stats = [
    { label: "Total Books", value: "2,847", icon: BookOpen, color: "bg-blue-500" },
    { label: "Active Members", value: "342", icon: Users, color: "bg-green-500" },
    { label: "Books Checked Out", value: "127", icon: Clock, color: "bg-orange-500" },
    { label: "Overdue Items", value: "8", icon: AlertCircle, color: "bg-red-500" },
  ];

  const recentActivity = [
    { action: "Book added via AI", title: "The Great Gatsby", time: "5 min ago", status: "success" },
    { action: "Check-out", title: "To Kill a Mockingbird", time: "12 min ago", status: "info" },
    { action: "AI Classification", title: "Sapiens: A Brief History", time: "18 min ago", status: "pending" },
    { action: "Check-in", title: "1984", time: "25 min ago", status: "success" },
    { action: "Shelf reorganization", title: "Section C - History", time: "1 hour ago", status: "success" },
  ];

  const aiRecommendations = [
    {
      title: "Shelf capacity warning",
      description: "Section B (Fiction) is at 94% capacity. Consider redistribution.",
      priority: "high",
    },
    {
      title: "Misplaced items detected",
      description: "3 Science books found in History section (D-4).",
      priority: "medium",
    },
    {
      title: "Optimize organization",
      description: "Group related subjects: Philosophy books span 3 sections.",
      priority: "low",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s your library overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-semibold">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.title}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{activity.time}</span>
                    <Badge variant={activity.status === "success" ? "default" : activity.status === "pending" ? "secondary" : "outline"}>
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">{rec.title}</p>
                    <Badge
                      variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{rec.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
