"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Search, Bell, Download, MoreHorizontal, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample data for users
const users = [
  {
    id: 1,
    name: "Sarah Lee",
    email: "sarah@example.com",
    role: "Tutor",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@example.com",
    role: "Student",
    status: "Suspended",
    joinDate: "2024-01-10",
  },
  
]

export default function UsersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUsers, setFilteredUsers] = useState(users)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query),
      ),
    )
  }

  const handleStatusChange = (userId: number, newStatus: boolean) => {
    setFilteredUsers(
      filteredUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status: newStatus ? "Active" : "Suspended",
          }
        }
        return user
      }),
    )
  }

  const handleExport = () => {
    // Convert users data to CSV
    const headers = ["Name", "Email", "Role", "Status", "Join Date"]
    const csvData = [
      headers.join(","),
      ...filteredUsers.map((user) => [user.name, user.email, user.role, user.status, user.joinDate].join(",")),
    ].join("\n")

    // Create and download the CSV file
    const blob = new Blob([csvData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 flex flex-col">
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

          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">User Management</h1>
              <div className="flex gap-4">
                <Button onClick={() => router.push("/admin/users/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
                <Button variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Users
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <Input
                  placeholder="Search users by name, email, or role..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="max-w-md"
                />
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={user.status === "Active"}
                              onCheckedChange={(checked) => handleStatusChange(user.id, checked)}
                            />
                            <span className={user.status === "Active" ? "text-green-600" : "text-red-600"}>
                              {user.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`/admin/users/${user.id}`)}>
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => router.push(`/admin/users/${user.id}/edit`)}>
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  if (confirm("Are you sure you want to delete this user?")) {
                                  
                                  }
                                }}
                              >
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

