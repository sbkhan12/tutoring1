"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { TutorSidebar } from "@/components/tutor-sidebar"
import { Search, Bell, Download, TrendingUp, DollarSign, Users, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const transactions = [
  {
    id: "#45678",
    date: "2024-03-06",
    student: "Charlie",
    type: "Session Payment",
    amount: 50,
    status: "Completed",
  },
  {
    id: "#45677",
    date: "2024-03-05",
    student: "Lucy ",
    type: "Session Payment",
    amount: 75,
    status: "Pending",
  },
]

const stats = {
  totalEarnings: "$1,580",
  thisMonth: "$580",
  lastMonth: "$1,000",
  sessionsCompleted: "32",
}

export default function EarningsPage() {
  const [dateFilter, setDateFilter] = useState("all")

  const handleExport = () => {
    // Convert earnings data to CSV
    const headers = ["Transaction ID", "Date", "Student", "Type", "Amount", "Status"]
    const csvData = [
      headers.join(","),
      ...transactions.map((tx) => [tx.id, tx.date, tx.student, tx.type, tx.amount, tx.status].join(",")),
    ].join("\n")

    // Create and download the CSV file
    const blob = new Blob([csvData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "earnings.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <div className="flex flex-1">
        <TutorSidebar />

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
              <h1 className="text-2xl font-semibold">Earnings</h1>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export Earnings
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <div className="text-sm text-gray-500">Total Earnings</div>
                </div>
                <div className="text-2xl font-semibold text-green-600">{stats.totalEarnings}</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <div className="text-sm text-gray-500">This Month</div>
                </div>
                <div className="text-2xl font-semibold">{stats.thisMonth}</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <div className="text-sm text-gray-500">Last Month</div>
                </div>
                <div className="text-2xl font-semibold">{stats.lastMonth}</div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-orange-500" />
                  <div className="text-sm text-gray-500">Sessions Completed</div>
                </div>
                <div className="text-2xl font-semibold">{stats.sessionsCompleted}</div>
              </div>
            </div>

            {/* Earnings Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Earnings Overview</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                Earnings Chart Visualization
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-medium">{tx.id}</TableCell>
                        <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                        <TableCell>{tx.student}</TableCell>
                        <TableCell>{tx.type}</TableCell>
                        <TableCell>${tx.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              tx.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {tx.status}
                          </span>
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

