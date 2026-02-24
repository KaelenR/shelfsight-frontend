"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  BookOpen,
  UserCircle,
  Search,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface Member {
  id: string;
  name: string;
  email: string;
  memberNumber: string;
  status: "active" | "suspended";
}

interface Transaction {
  id: string;
  bookTitle: string;
  bookISBN: string;
  memberName: string;
  memberNumber: string;
  checkoutDate: string;
  dueDate: string;
  returnDate?: string;
  status: "active" | "overdue" | "returned";
  fine: number;
}

export default function CirculationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedBook, setSelectedBook] = useState<{ id: string; title: string; isbn: string; available: boolean } | null>(null);

  const mockMembers: Member[] = [
    { id: "1", name: "Sarah Johnson", email: "sarah.j@email.com", memberNumber: "M001234", status: "active" },
    { id: "2", name: "Michael Chen", email: "michael.c@email.com", memberNumber: "M001235", status: "active" },
    { id: "3", name: "Emily Davis", email: "emily.d@email.com", memberNumber: "M001236", status: "suspended" },
  ];

  const mockBooks = [
    { id: "1", title: "The Great Gatsby", isbn: "978-0-7432-7356-5", available: true },
    { id: "2", title: "To Kill a Mockingbird", isbn: "978-0-06-112008-4", available: false },
    { id: "3", title: "1984", isbn: "978-0-452-28423-4", available: true },
  ];

  const mockTransactions: Transaction[] = [
    {
      id: "1",
      bookTitle: "The Great Gatsby",
      bookISBN: "978-0-7432-7356-5",
      memberName: "Sarah Johnson",
      memberNumber: "M001234",
      checkoutDate: "2026-02-10",
      dueDate: "2026-02-24",
      status: "active",
      fine: 0,
    },
    {
      id: "2",
      bookTitle: "Sapiens",
      bookISBN: "978-0-06-231609-7",
      memberName: "Michael Chen",
      memberNumber: "M001235",
      checkoutDate: "2026-02-01",
      dueDate: "2026-02-15",
      status: "overdue",
      fine: 2.50,
    },
    {
      id: "3",
      bookTitle: "Pride and Prejudice",
      bookISBN: "978-0-14-143951-8",
      memberName: "Emily Davis",
      memberNumber: "M001236",
      checkoutDate: "2026-01-20",
      dueDate: "2026-02-03",
      returnDate: "2026-02-10",
      status: "returned",
      fine: 3.50,
    },
  ];

  const handleCheckOut = () => {
    if (!selectedMember || !selectedBook) {
      toast.error("Please select both a member and a book");
      return;
    }
    toast.success(`Checked out "${selectedBook.title}" to ${selectedMember.name}`);
    setSelectedMember(null);
    setSelectedBook(null);
  };

  const handleCheckIn = () => {
    toast.success("Book checked in successfully");
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-500">Active</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      case "returned":
        return <Badge className="bg-green-500">Returned</Badge>;
    }
  };

  const calculateDaysOverdue = (dueDate: string) => {
    const today = new Date("2026-02-17");
    const due = new Date(dueDate);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Circulation Management</h1>
        <p className="text-gray-600">Handle check-ins, check-outs, and manage transactions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Loans</p>
                <p className="text-2xl font-semibold mt-1">
                  {mockTransactions.filter((t) => t.status === "active").length}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue Items</p>
                <p className="text-2xl font-semibold mt-1">
                  {mockTransactions.filter((t) => t.status === "overdue").length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Returns Today</p>
                <p className="text-2xl font-semibold mt-1">5</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Outstanding Fines</p>
                <p className="text-2xl font-semibold mt-1">$28.50</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="checkout" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="checkout">Check-Out / Check-In</TabsTrigger>
          <TabsTrigger value="transactions">Active Transactions</TabsTrigger>
        </TabsList>

        {/* Check-Out/Check-In Tab */}
        <TabsContent value="checkout" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Member Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5" />
                  Select Member
                </CardTitle>
                <CardDescription>Search by name or member number</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search member..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {mockMembers
                    .filter(
                      (m) =>
                        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        m.memberNumber.includes(searchQuery)
                    )
                    .map((member) => (
                      <button
                        key={member.id}
                        onClick={() => setSelectedMember(member)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedMember?.id === member.id
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.memberNumber}</p>
                          </div>
                          <Badge variant={member.status === "active" ? "default" : "destructive"}>
                            {member.status}
                          </Badge>
                        </div>
                      </button>
                    ))}
                </div>

                {selectedMember && (
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm font-medium text-indigo-900">Selected Member</p>
                    <p className="text-lg font-semibold mt-1">{selectedMember.name}</p>
                    <p className="text-sm text-indigo-700">{selectedMember.email}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Book Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Select Book
                </CardTitle>
                <CardDescription>Search by title or ISBN</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search book..." className="pl-10" />
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {mockBooks.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => book.available && setSelectedBook(book)}
                      disabled={!book.available}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedBook?.id === book.id
                          ? "border-indigo-600 bg-indigo-50"
                          : book.available
                          ? "border-gray-200 hover:border-gray-300 bg-white"
                          : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{book.title}</p>
                          <p className="text-sm text-gray-600">{book.isbn}</p>
                        </div>
                        <Badge variant={book.available ? "default" : "secondary"}>
                          {book.available ? "Available" : "Checked Out"}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedBook && (
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm font-medium text-indigo-900">Selected Book</p>
                    <p className="text-lg font-semibold mt-1">{selectedBook.title}</p>
                    <p className="text-sm text-indigo-700">{selectedBook.isbn}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Check-Out Action */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Transaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Checkout Date</Label>
                  <Input type="date" value="2026-02-17" readOnly className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Due Date (14 days)</Label>
                  <Input type="date" value="2026-03-03" readOnly className="mt-1" />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCheckOut}
                  disabled={!selectedMember || !selectedBook}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Check-Out
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedMember(null);
                    setSelectedBook(null);
                  }}
                >
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Transactions Tab */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Active Loans & Overdue Items</CardTitle>
              <CardDescription>Manage current circulation and process returns</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Checkout Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fine</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions
                    .filter((t) => t.status !== "returned")
                    .map((transaction) => {
                      const daysOverdue = calculateDaysOverdue(transaction.dueDate);
                      return (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{transaction.bookTitle}</p>
                              <p className="text-xs text-gray-500">{transaction.bookISBN}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm">{transaction.memberName}</p>
                              <p className="text-xs text-gray-500">{transaction.memberNumber}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              {new Date(transaction.checkoutDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              {new Date(transaction.dueDate).toLocaleDateString()}
                              {daysOverdue > 0 && (
                                <span className="text-xs text-red-600 ml-2">
                                  ({daysOverdue}d overdue)
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell>
                            <span className={transaction.fine > 0 ? "text-red-600 font-medium" : ""}>
                              ${transaction.fine.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleCheckIn()}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Check In
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
