"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { StudentSidebar } from "@/components/student-sidebar"
import { Button } from "@/components/ui/button"

// Sample data
const bookings = [
  { id: 1, date: "Jan 15, 2023", time: "3:00 PM", tutor: "John Smith", status: "Confirmed" },
  { id: 2, date: "Jan 20, 2023", time: "1:00 PM", tutor: "Sarah Brown", status: "Pending" },
  { id: 3, date: "Jan 22, 2023", time: "4:00 PM", tutor: "Emily Clark", status: "Confirmed" },
  { id: 4, date: "Jan 27, 2023", time: "2:00 PM", tutor: "James Wilson", status: "Cancelled" },
]

export default function ViewBookings() {
  const router = useRouter()

  const handleBookingAction = (id: number, action: string) => {
    alert(`${action} booking #${id}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <div className="flex flex-1">
        <StudentSidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Dashboard content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">Your Bookings</h1>
            </div>

            {/* Bookings section */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Bookings</h2>
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
          </div>
        </main>
      </div>
    </div>
  )
}