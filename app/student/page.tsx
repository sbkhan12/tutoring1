"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { StudentSidebar } from "@/components/student-sidebar"
import { Search, Bell, ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react"

// Sample data
const bookings = [
  { id: 1, date: "Jan 15, 2023", time: "3:00 PM", tutor: "John Smith", status: "Confirmed" },
  { id: 2, date: "Jan 20, 2023", time: "1:00 PM", tutor: "Sarah Brown", status: "Pending" },
  { id: 3, date: "Jan 22, 2023", time: "4:00 PM", tutor: "Emily Clark", status: "Confirmed" },
  { id: 4, date: "Jan 27, 2023", time: "2:00 PM", tutor: "James Wilson", status: "Cancelled" },
]

const ratings = [
  { id: 1, tutor: "John Smith", date: "Jan 10, 2023", rating: 5, comment: "Helped me improve my grades!" },
  { id: 2, tutor: "John Smith", date: "Dec 15, 2022", rating: 5, comment: "Excellent at explaining complex topics." },
  { id: 3, tutor: "John Smith", date: "Nov 20, 2022", rating: 5, comment: "Very patient and knowledgeable." },
]

const payments = [
  { id: 1, date: "Jan 5, 2023", amount: "$30.00", description: "Weekly Tutoring Session", status: "Paid" },
  { id: 2, date: "Dec 29, 2022", amount: "$30.00", description: "Weekly Tutoring Session", status: "Paid" },
  { id: 3, date: "Dec 22, 2022", amount: "$30.00", description: "Weekly Tutoring Session", status: "Active" },
]

const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1)

export default function StudentDashboard() {
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

  const handleViewAllBookings = () => {
    router.push("/student/booked")
  }

  const handleRateNewTutor = () => {
    router.push("/student/rating")
  }

  const handleViewPaymentHistory = () => {
    router.push("/student/payments")
  }

  const handleBookingAction = (id: number, action: string) => {
    alert(`${action} booking #${id}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <div className="flex flex-1">
        <StudentSidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white p-4 flex items-center justify-between shadow-sm">
            <Logo />

            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative w-64">
                <Input
                  placeholder="Search for tutors..."
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
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">Welcome, Nolan Rosser</h1>
            </div>

            {/* Upcoming session alert */}
            <div className="bg-blue-100 p-4 rounded-lg mb-6">
              <h2 className="font-medium text-blue-800">UPCOMING SESSION TODAY</h2>
              <p className="text-blue-700">Math with John Smith | 3:00 PM, Wed</p>
              <div className="mt-2">
                <Button size="sm" onClick={() => router.push("/student/booked")}>
                  View Session Details
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bookings section */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Your Bookings</h2>
                    <Button variant="outline" size="sm" className="text-xs" onClick={handleViewAllBookings}>
                      View All Bookings <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs text-gray-500 border-b">
                          <th className="pb-2 font-medium">Date</th>
                          <th className="pb-2 font-medium">Time</th>
                          <th className="pb-2 font-medium">Tutor</th>
                          <th className="pb-2 font-medium">Status</th>
                          <th className="pb-2 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="border-b last:border-0">
                            <td className="py-3 text-sm">{booking.date}</td>
                            <td className="py-3 text-sm">{booking.time}</td>
                            <td className="py-3 text-sm">{booking.tutor}</td>
                            <td className="py-3 text-sm">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  booking.status === "Confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-3 text-sm">
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-800"
                                  onClick={() => handleBookingAction(booking.id, "View")}
                                >
                                  View
                                </Button>
                                {booking.status === "Pending" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => handleBookingAction(booking.id, "Cancel")}
                                  >
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4">
                    <Button onClick={() => router.push("/student/bookings/new")}>Book New Session</Button>
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
                      <div>Math tutoring with John Smith</div>
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
                      <div>Physics tutoring with Sarah Brown</div>
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
                      <div>Chemistry tutoring with Emily Clark</div>
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
                {/* Ratings & Reviews section */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Ratings & Reviews</h2>
                    <Button variant="outline" size="sm" className="text-xs" onClick={handleRateNewTutor}>
                      Rate a New Tutor <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {ratings.map((rating) => (
                      <div key={rating.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <Image
                              src="/placeholder.svg?height=32&width=32"
                              alt={rating.tutor}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{rating.tutor}</div>
                            <div className="text-xs text-gray-500">{rating.date}</div>
                          </div>
                        </div>
                        <div className="flex mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < rating.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm mt-1 text-gray-600">{rating.comment}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 mt-1"
                          onClick={() => router.push(`/student/ratings/${rating.id}`)}
                        >
                          Edit Review
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment History section */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Payment History</h2>
                    <Button variant="outline" size="sm" className="text-xs" onClick={handleViewPaymentHistory}>
                      View Detailed History <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs text-gray-500 border-b">
                          <th className="pb-2 font-medium">Date</th>
                          <th className="pb-2 font-medium">Amount</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => (
                          <tr key={payment.id} className="border-b last:border-0">
                            <td className="py-3 text-sm">{payment.date}</td>
                            <td className="py-3 text-sm">{payment.amount}</td>
                            <td className="py-3 text-sm">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  payment.status === "Paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-right">Next Billing Date: Feb 5, 2023</div>
                  <div className="mt-4">
                    <Button onClick={() => router.push("/student/payments/make-payment")}>Make a Payment</Button>
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

