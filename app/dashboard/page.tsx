"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { TutorSidebar } from "@/components/tutor-sidebar"
import { Search, Bell, ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react"

// Sample data
const bookings = [
  { id: 1, student: "student 1", date: "Jan 15, 2023", time: "2:00 PM" },
  { id: 2, student: "student 2", date: "Jan 16, 2023", time: "3:30 PM" },
  { id: 3, student: "student 3", date: "Jan 18, 2023", time: "4:00 PM" },
  { id: 4, student: "student 4", date: "Jan 20, 2023", time: "1:00 PM" },
]

const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1)

export default function Dashboard() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState("March 2023")
  const [searchQuery, setSearchQuery] = useState("")

  const handlePrevMonth = () => {
    setCurrentMonth("February 2023")
  }

  const handleNextMonth = () => {
    setCurrentMonth("April 2023")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Searching for: ${searchQuery}`)
  }

  const handleViewCalendar = () => {
    router.push("/dashboard/bookings")
  }

  const handleEditProfile = () => {
    router.push("/dashboard/profile")
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <div className="flex flex-1">
        <TutorSidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white p-4 flex items-center justify-between shadow-sm">
            <Logo />

            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative w-64">
                <Input
                  placeholder="Search for students..."
                  className="pl-9 rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </form>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-md" onClick={() => alert("Filter options")}>
                  Filter
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <button className="text-gray-600" onClick={() => alert("Notifications")}>
                  <Bell size={20} />
                </button>
              </div>
            </div>
          </header>

          {/* Dashboard content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bookings section */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Your Bookings</h2>
                    <Button variant="outline" size="sm" className="text-xs" onClick={handleViewCalendar}>
                      View Calendar <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs text-gray-500 border-b">
                          <th className="pb-2 font-medium">Student Name</th>
                          <th className="pb-2 font-medium">Date</th>
                          <th className="pb-2 font-medium">Time</th>
                          <th className="pb-2 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="border-b last:border-0">
                            <td className="py-3 text-sm">{booking.student}</td>
                            <td className="py-3 text-sm">{booking.date}</td>
                            <td className="py-3 text-sm">{booking.time}</td>
                            <td className="py-3 text-sm">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => alert(`View details for booking with ${booking.student}`)}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Calendar section */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">TUESDAY</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={handlePrevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">{currentMonth}</span>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={handleNextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-4xl font-light">07</div>
                    <div className="text-sm text-gray-500">March 2023</div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-4">
                    <div className="text-center text-xs font-medium">SUN</div>
                    <div className="text-center text-xs font-medium">MON</div>
                    <div className="text-center text-xs font-medium">TUE</div>
                    <div className="text-center text-xs font-medium">WED</div>
                    <div className="text-center text-xs font-medium">THU</div>
                    <div className="text-center text-xs font-medium">FRI</div>
                    <div className="text-center text-xs font-medium">SAT</div>

                    {calendarDays.map((day) => (
                      <div
                        key={day}
                        className={`text-center text-sm p-1 rounded-full cursor-pointer hover:bg-blue-100 ${day === 7 ? "bg-blue-500 text-white" : ""}`}
                        onClick={() => alert(`Selected day: ${day} ${currentMonth}`)}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="bg-blue-100 p-2 rounded text-sm">
                      <div className="text-xs text-blue-600 font-medium">9:00 AM - 10:00 AM</div>
                      <div>Math tutoring with Charlie </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 mt-1"
                        onClick={() => alert("View session details")}
                      >
                        View Details
                      </Button>
                    </div>
                    <div className="bg-blue-100 p-2 rounded text-sm">
                      <div className="text-xs text-blue-600 font-medium">1:00 PM - 2:00 PM</div>
                      <div>Physics tutoring with Smith</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 mt-1"
                        onClick={() => alert("View session details")}
                      >
                        View Details
                      </Button>
                    </div>
                    <div className="bg-blue-100 p-2 rounded text-sm">
                      <div className="text-xs text-blue-600 font-medium">4:00 PM - 5:00 PM</div>
                      <div>Chemistry tutoring with Johnson</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 mt-1"
                        onClick={() => alert("View session details")}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Earnings section */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Earnings</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => router.push("/dashboard/earnings")}
                    >
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500">This Month</div>
                      <div className="text-xl font-semibold text-green-600">$1,580</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Last Month</div>
                      <div className="text-xl font-semibold">$920</div>
                    </div>
                    <Button className="w-full mt-2" onClick={() => router.push("/dashboard/earnings")}>
                      View Earnings Report
                    </Button>
                  </div>
                </div>

                {/* Profile section */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Profile Management</h2>
                    <Button variant="outline" size="sm" className="text-xs" onClick={handleEditProfile}>
                      Edit Profile <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-2">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="John Smith"
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold">John </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-500">(5.0)</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">68 Sessions</div>
                    <div className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Top Rated</div>
                    <Button variant="outline" className="mt-4 w-full" onClick={() => router.push("/dashboard/profile")}>
                      Update Profile
                    </Button>
                  </div>
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

