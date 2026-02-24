"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Users,
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Edit,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberNumber: string;
  address: string;
  joinDate: string;
  status: "active" | "suspended" | "expired";
  booksCheckedOut: number;
  totalBorrowed: number;
  fines: number;
}

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const mockMembers: Member[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      memberNumber: "M001234",
      address: "123 Main St, Springfield, IL 62701",
      joinDate: "2024-01-15",
      status: "active",
      booksCheckedOut: 2,
      totalBorrowed: 47,
      fines: 0,
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@email.com",
      phone: "(555) 234-5678",
      memberNumber: "M001235",
      address: "456 Oak Ave, Springfield, IL 62702",
      joinDate: "2024-03-22",
      status: "active",
      booksCheckedOut: 1,
      totalBorrowed: 23,
      fines: 2.50,
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily.d@email.com",
      phone: "(555) 345-6789",
      memberNumber: "M001236",
      address: "789 Elm St, Springfield, IL 62703",
      joinDate: "2023-11-10",
      status: "suspended",
      booksCheckedOut: 0,
      totalBorrowed: 65,
      fines: 15.00,
    },
    {
      id: "4",
      name: "James Wilson",
      email: "james.w@email.com",
      phone: "(555) 456-7890",
      memberNumber: "M001237",
      address: "321 Pine Rd, Springfield, IL 62704",
      joinDate: "2025-06-05",
      status: "active",
      booksCheckedOut: 3,
      totalBorrowed: 12,
      fines: 0,
    },
    {
      id: "5",
      name: "Linda Martinez",
      email: "linda.m@email.com",
      phone: "(555) 567-8901",
      memberNumber: "M001238",
      address: "654 Maple Dr, Springfield, IL 62705",
      joinDate: "2023-02-18",
      status: "expired",
      booksCheckedOut: 0,
      totalBorrowed: 89,
      fines: 0,
    },
  ];

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.memberNumber.includes(searchQuery);

    const matchesStatus = statusFilter === "all" || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Member["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>;
      case "expired":
        return <Badge className="bg-gray-500">Expired</Badge>;
    }
  };

  const handleAddMember = () => {
    toast.success("New member added successfully");
    setIsAddDialogOpen(false);
  };

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setIsViewDialogOpen(true);
  };

  const handleDeleteMember = () => {
    toast.success("Member deleted successfully");
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Member Management</h1>
          <p className="text-gray-600">Manage library members and their accounts</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add New Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>Create a new library member account</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberNumber">Member Number</Label>
                <Input id="memberNumber" placeholder="M001239" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St, City, State, ZIP" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-semibold mt-1">{mockMembers.length}</p>
              </div>
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-2xl font-semibold mt-1">
                  {mockMembers.filter((m) => m.status === "active").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-semibold mt-1">
                  {mockMembers.filter((m) => m.status === "suspended").length}
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
                <p className="text-sm text-gray-600">Total Fines Due</p>
                <p className="text-2xl font-semibold mt-1">
                  ${mockMembers.reduce((acc, m) => acc + m.fines, 0).toFixed(2)}
                </p>
              </div>
              <div className="text-orange-600 text-sm font-medium">Outstanding</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or member number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Members List ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Member Number</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Books Out</TableHead>
                  <TableHead>Fines</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No members found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.memberNumber}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Phone className="w-3 h-3" />
                            {member.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {new Date(member.joinDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={member.booksCheckedOut > 0 ? "default" : "secondary"}>
                          {member.booksCheckedOut}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={member.fines > 0 ? "text-red-600 font-medium" : "text-gray-600"}>
                          ${member.fines.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewMember(member)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMember()}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Member Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
            <DialogDescription>Complete member information and borrowing history</DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-medium">{selectedMember.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Member Number</p>
                      <p className="font-medium">{selectedMember.memberNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <p className="text-sm">{selectedMember.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <p className="text-sm">{selectedMember.phone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3 h-3 text-gray-400 mt-0.5" />
                        <p className="text-sm">{selectedMember.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Account Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      {getStatusBadge(selectedMember.status)}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Join Date</p>
                      <p className="font-medium">
                        {new Date(selectedMember.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Books Checked Out</p>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <p className="font-medium">{selectedMember.booksCheckedOut}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Books Borrowed</p>
                      <p className="font-medium">{selectedMember.totalBorrowed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Outstanding Fines</p>
                      <p className={`font-medium ${selectedMember.fines > 0 ? "text-red-600" : "text-green-600"}`}>
                        ${selectedMember.fines.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Actions</h3>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline">View Borrowing History</Button>
                  <Button size="sm" variant="outline">Send Email</Button>
                  <Button size="sm" variant="outline">Edit Member</Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
