"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Search, Bell, Download, BarChart, Users, DollarSign, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("month")

  const handleExport = (reportType: string) => {
    // In a real app 
    alert(`Exporting ${reportType} report for ${dateRange} range`)
  }

  const reports = [
    {
      title: "User Activity Report",
      icon: Users,
      description: "Track user registrations, active users, and engagement metrics",
      stats: {
        total: "1,245",
        change: "+12%",
        period: "vs last month",
      },
    },
    {
      title: "Financial Report",
      icon: DollarSign,
      description: "Overview of revenue, transactions, and payment analytics",
      stats: {
        total: "$56,890",
        change: "+8%",
        period: "vs last month",
      },
    },
    {
      title: "Session Analytics",
      icon: BarChart,
      description: "Insights into tutoring sessions, duration, and completion rates",
      stats: {
        total: "786",
        change: "+15%",
        period: "vs last month",
      },
    },
    {
      title: "Performance Metrics",
      icon: TrendingUp,
      description: "Platform performance, user satisfaction, and growth metrics",
      stats: {
        total: "94%",
        change: "+3%",
        period: "vs last month",
      },
    },
  ]

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
              <h1 className="text-2xl font-semibold">Platform Reports</h1>
              <div className="flex items-center gap-4">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report) => (
                <div key={report.title} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <report.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h2 className="text-lg font-semibold">{report.title}</h2>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleExport(report.title)}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <p className="text-gray-600 mb-4">{report.description}</p>

                  <div className="flex items-end gap-2">
                    <div className="text-2xl font-semibold">{report.stats.total}</div>
                    <div className="text-sm text-green-600 mb-1">
                      {report.stats.change} {report.stats.period}
                    </div>
                  </div>

                  
                  <div className="h-48 bg-gray-50 rounded-lg mt-4 flex items-center justify-center text-gray-400">
                    Chart Visualization
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

