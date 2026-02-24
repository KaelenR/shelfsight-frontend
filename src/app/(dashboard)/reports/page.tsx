"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  BookOpen,
  Users,
  Calendar,
  Award,
  Clock,
  DollarSign
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ReportsPage() {
  const circulationData = [
    { month: "Aug", checkouts: 245, returns: 238 },
    { month: "Sep", checkouts: 289, returns: 276 },
    { month: "Oct", checkouts: 312, returns: 305 },
    { month: "Nov", checkouts: 298, returns: 294 },
    { month: "Dec", checkouts: 267, returns: 271 },
    { month: "Jan", checkouts: 324, returns: 318 },
    { month: "Feb", checkouts: 287, returns: 279 },
  ];

  const categoryData = [
    { category: "Fiction", count: 847, color: "#6366f1" },
    { category: "Non-Fiction", count: 623, color: "#8b5cf6" },
    { category: "Science", count: 412, color: "#ec4899" },
    { category: "History", count: 356, color: "#f59e0b" },
    { category: "Biography", count: 289, color: "#10b981" },
    { category: "Children", count: 320, color: "#3b82f6" },
  ];

  const memberGrowthData = [
    { month: "Aug", members: 312 },
    { month: "Sep", members: 324 },
    { month: "Oct", members: 331 },
    { month: "Nov", members: 338 },
    { month: "Dec", members: 342 },
    { month: "Jan", members: 349 },
    { month: "Feb", members: 342 },
  ];

  const topBooks = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", borrows: 42, category: "Fiction" },
    { title: "Sapiens", author: "Yuval Noah Harari", borrows: 38, category: "Non-Fiction" },
    { title: "1984", author: "George Orwell", borrows: 35, category: "Fiction" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", borrows: 33, category: "Fiction" },
    { title: "A Brief History of Time", author: "Stephen Hawking", borrows: 29, category: "Science" },
  ];

  const shelfUtilization = [
    { section: "A-1", capacity: 150, used: 142, percentage: 95 },
    { section: "A-2", capacity: 150, used: 98, percentage: 65 },
    { section: "B-1", capacity: 150, used: 134, percentage: 89 },
    { section: "B-2", capacity: 150, used: 141, percentage: 94 },
    { section: "C-1", capacity: 200, used: 165, percentage: 83 },
    { section: "C-2", capacity: 200, used: 178, percentage: 89 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Insights and statistics for library performance</p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Total Circulation</p>
            <p className="text-3xl font-semibold mt-1">2,022</p>
            <p className="text-xs text-green-600 mt-2">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Active Members</p>
            <p className="text-3xl font-semibold mt-1">342</p>
            <p className="text-xs text-green-600 mt-2">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-orange-600" />
              <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
            </div>
            <p className="text-sm text-gray-600">Avg. Loan Duration</p>
            <p className="text-3xl font-semibold mt-1">9.4d</p>
            <p className="text-xs text-orange-600 mt-2">-1.2d from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Fines Collected</p>
            <p className="text-3xl font-semibold mt-1">$142</p>
            <p className="text-xs text-green-600 mt-2">+5.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="circulation" className="space-y-6">
        <TabsList>
          <TabsTrigger value="circulation">Circulation</TabsTrigger>
          <TabsTrigger value="collection">Collection</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="shelves">Shelves</TabsTrigger>
        </TabsList>

        {/* Circulation Tab */}
        <TabsContent value="circulation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Circulation Trends</CardTitle>
                <CardDescription>Check-outs and returns over the last 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={circulationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="checkouts" stroke="#6366f1" strokeWidth={2} />
                    <Line type="monotone" dataKey="returns" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Top Books
                </CardTitle>
                <CardDescription>Most borrowed this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topBooks.slice(0, 5).map((book, index) => (
                    <div key={index} className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-sm">{book.title}</p>
                            <p className="text-xs text-gray-500">{book.author}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-indigo-600">{book.borrows}</p>
                        <p className="text-xs text-gray-500">borrows</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Due This Week</p>
                <p className="text-2xl font-semibold mt-1">47 books</p>
                <p className="text-xs text-gray-500 mt-2">Across 28 members</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-sm text-gray-600">Currently Overdue</p>
                <p className="text-2xl font-semibold mt-1">8 books</p>
                <p className="text-xs text-orange-600 mt-2">Avg. 4.2 days overdue</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Return Rate</p>
                <p className="text-2xl font-semibold mt-1">97.2%</p>
                <p className="text-xs text-green-600 mt-2">+0.8% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Collection Tab */}
        <TabsContent value="collection" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Collection by Category</CardTitle>
                <CardDescription>Distribution of books across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ payload, percent }: { payload?: { category?: string }; percent?: number }) => `${payload?.category ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Books by category and circulation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">Total Titles</p>
                <p className="text-3xl font-semibold mt-1">2,847</p>
                <p className="text-xs text-gray-500 mt-2">Across 6 main categories</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">New Acquisitions</p>
                <p className="text-3xl font-semibold mt-1">24</p>
                <p className="text-xs text-indigo-600 mt-2">This month via AI ingestion</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">Most Popular Genre</p>
                <p className="text-3xl font-semibold mt-1">Fiction</p>
                <p className="text-xs text-gray-500 mt-2">847 books, 34% borrows</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Growth</CardTitle>
                <CardDescription>New member registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={memberGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="members" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Member Activity</CardTitle>
                <CardDescription>Engagement and borrowing patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-blue-900">Active Borrowers</p>
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-semibold text-blue-900">237</p>
                  <p className="text-xs text-blue-700 mt-1">69% of total members</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-green-900">Avg. Books per Member</p>
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-semibold text-green-900">8.3</p>
                  <p className="text-xs text-green-700 mt-1">Per year</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-purple-900">Most Active Member</p>
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-lg font-semibold text-purple-900">Emily Davis</p>
                  <p className="text-xs text-purple-700 mt-1">65 books borrowed this year</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">New This Month</p>
                <p className="text-2xl font-semibold mt-1">12</p>
                <p className="text-xs text-green-600 mt-2">+20% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">Renewals Due</p>
                <p className="text-2xl font-semibold mt-1">8</p>
                <p className="text-xs text-orange-600 mt-2">Expiring this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">Suspended Accounts</p>
                <p className="text-2xl font-semibold mt-1">3</p>
                <p className="text-xs text-red-600 mt-2">Due to overdue items</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">Member Satisfaction</p>
                <p className="text-2xl font-semibold mt-1">4.7/5</p>
                <p className="text-xs text-green-600 mt-2">Based on 89 surveys</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Shelves Tab */}
        <TabsContent value="shelves" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shelf Utilization</CardTitle>
              <CardDescription>Capacity and usage across library sections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shelfUtilization.map((shelf) => (
                  <div key={shelf.section} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{shelf.section}</p>
                        <p className="text-xs text-gray-500">
                          {shelf.used} / {shelf.capacity} books
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{shelf.percentage}%</span>
                        {shelf.percentage >= 90 && (
                          <span className="text-xs text-red-600 font-medium">High</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          shelf.percentage >= 90
                            ? "bg-red-500"
                            : shelf.percentage >= 75
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${shelf.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">Total Shelf Capacity</p>
                <p className="text-2xl font-semibold mt-1">1,000</p>
                <p className="text-xs text-gray-500 mt-2">Across 6 sections</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">Average Utilization</p>
                <p className="text-2xl font-semibold mt-1">86%</p>
                <p className="text-xs text-orange-600 mt-2">2 sections need attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">AI Recommendations</p>
                <p className="text-2xl font-semibold mt-1">4</p>
                <p className="text-xs text-indigo-600 mt-2">Optimization suggestions</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
