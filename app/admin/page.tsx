"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Search, Bell, Download, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

// Sample data
const initialUsers = [
  { id: 1, name: "user 1", role: "Tutor", status: "Active", email: "user1@example.com" },
  { id: 2, name: "user 2", role: "Student", status: "Suspended", email: "user2@example.com" },
  { id: 3, name: "user 3", role: "Tutor", status: "Active", email: "user3@example.com" },
]

const payments = [
  { id: "#45678", user: "user 1", date: "2024-03-06", amount: 50, status: "Completed" },
  { id: "#45677", user: "user 2 ", date: "2024-03-05", amount: 75, status: "Pending" },
]

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState(initialUsers) // Track users' data
  const router = useRouter()

  const stats = {
    totalUsers: "124",
    activeUsers: "45",
    totalSessions: "78",
    totalRevenue: "$5689",
  }

  const platformStats = {
    usersAdded: "50",
    sessionsCompleted: "120",
  }

  // Handle status toggle
  interface User {
    id: number;
    name: string;
    role: string;
    status: string;
    email: string;
  }

  const handleStatusChange = (userId: number) => {
    setUsers((prevUsers: User[]) =>
      prevUsers.map((user: User) =>
        user.id === userId
          ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" }
          : user
      )
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <div className="flex flex-1">
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white p-4 flex items-center justify-between shadow-sm">
            <Logo />

            <div className="flex items-center gap-4">
              <button className="text-gray-600">
                <Search size={20} />
              </button>
              <button className="text-gray-600">
                <Bell size={20} />
              </button>
            </div>
          </header>

          {/* Dashboard content */}
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-gray-500 mb-1">Total Users</div>
                <div className="text-2xl font-semibold">{stats.totalUsers}</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-gray-500 mb-1">Active Users</div>
                <div className="text-2xl font-semibold">{stats.activeUsers}</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-gray-500 mb-1">Total Sessions</div>
                <div className="text-2xl font-semibold">{stats.totalSessions}</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-gray-500 mb-1">Total Revenue</div>
                <div className="text-2xl font-semibold text-green-600">{stats.totalRevenue}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Button onClick={() => router.push("/admin/users/new")} className="bg-blue-600 hover:bg-blue-700">
                Add New User
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/admin/payments")}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                View All Payments
              </Button>
            </div>

            {/* Manage Users Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Manage Users</h2>
                <Button variant="outline" size="sm">
                  View all Users
                </Button>
              </div>

              <div className="mb-4">
                <Input
                  placeholder="Search by name, email, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={user.status === "Active"}
                              onCheckedChange={() => handleStatusChange(user.id)}
                            />
                            <span className={user.status === "Active" ? "text-green-600" : "text-red-600"}>
                              {user.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Manage Payments Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Manage Payments</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Process Refunds
                  </Button>
                  <Button variant="outline" size="sm">
                    View all Transactions
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.user}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              payment.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Platform Reports Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Platform Reports</h2>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="text-sm text-gray-500 mb-1">Users Added Today</div>
                  <div className="text-2xl font-semibold">{platformStats.usersAdded}</div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="text-sm text-gray-500 mb-1">Sessions Completed Today</div>
                  <div className="text-2xl font-semibold">{platformStats.sessionsCompleted}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
