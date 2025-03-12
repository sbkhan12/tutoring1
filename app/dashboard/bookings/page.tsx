"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { TutorSidebar } from "@/components/tutor-sidebar"
import { Search, Bell, ChevronLeft, ChevronRight, Plus } from "lucide-react"

// Sample data
const bookings = [
  {
    id: 1,
    student: "Charlie",
    subject: "Mathematics",
    date: "2024-03-07",
    time: "14:00",
    duration: "1 hour",
    status: "Confirmed",
  },
  {
    id: 2,
    student: "Smith",
    subject: "Physics",
    date: "2024-03-08",
    time: "15:30",
    duration: "1 hour",
    status: "Pending",
  },
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

export default function BookingsPage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const days = []
    const startPadding = firstDay.getDay()

    // Add padding for days from previous month
    for (let i = 0; i < startPadding; i++) {
      days.push(null)
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setSelectedTimeSlot(null)
  }

  const handleTimeSlotClick = (time: string) => {
    setSelectedTimeSlot(time)
  }

  const isDateBooked = (date: Date) => {
    return bookings.some((booking) => booking.date === date.toISOString().split("T")[0])
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
              <h1 className="text-2xl font-semibold">Bookings</h1>
              <Button onClick={() => router.push("/dashboard/bookings")}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Booking
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar and Time Slots */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Calendar</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">
                        {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
                      </span>
                      <Button variant="outline" size="sm" onClick={handleNextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentDate).map((date, index) => (
                      <div
                        key={index}
                        className={`
                          aspect-square p-2 text-center cursor-pointer rounded-lg
                          ${!date ? "text-gray-300" : ""}
                          ${date && isDateBooked(date) ? "bg-blue-100" : ""}
                          ${date && selectedDate?.toDateString() === date.toDateString() ? "bg-blue-500 text-white" : ""}
                          hover:bg-blue-50
                        `}
                        onClick={() => date && handleDateClick(date)}
                      >
                        {date?.getDate()}
                      </div>
                    ))}
                  </div>

                  {selectedDate && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">
                        Available Time Slots for {selectedDate.toLocaleDateString()}
                      </h3>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            className={`
                              p-2 text-sm rounded-lg text-center
                              ${selectedTimeSlot === time ? "bg-blue-500 text-white" : "bg-gray-50"}
                              hover:bg-blue-100
                            `}
                            onClick={() => handleTimeSlotClick(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Bookings */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Upcoming Bookings</h2>
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{booking.student}</h3>
                            <p className="text-sm text-gray-500">{booking.subject}</p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>{new Date(booking.date).toLocaleDateString()}</p>
                          <p>
                            {booking.time} ({booking.duration})
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => router.push(`/dashboard/bookings/${booking.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    ))}
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

