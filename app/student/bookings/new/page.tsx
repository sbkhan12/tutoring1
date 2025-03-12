"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { Search, Bell, Calendar, Clock, Star } from "lucide-react"
import { StudentSidebar } from "@/components/student-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const availableTutors = [
  {
    id: 1,
    name: "John Smith",
    subject: "Mathematics",
    rating: 5,
    reviews: 24,
    hourlyRate: 30,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Sarah Brown",
    subject: "Physics",
    rating: 4.8,
    reviews: 18,
    hourlyRate: 35,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Emily Clark",
    subject: "Chemistry",
    rating: 4.9,
    reviews: 32,
    hourlyRate: 40,
    image: "/placeholder.svg?height=80&width=80",
  },
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

export default function BookSession() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedTutor, setSelectedTutor] = useState<number | null>(null)
  const [subject, setSubject] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the booking data to your backend
    router.push("/student")
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
              <button className="text-gray-600">
                <Search size={20} />
              </button>
              <button className="text-gray-600">
                <Bell size={20} />
              </button>
            </div>
          </header>

          {/* Booking content */}
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-semibold mb-6">Book a New Session</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Booking form */}
              <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select a Tutor</label>
                    <div className="space-y-4">
                      {availableTutors.map((tutor) => (
                        <div
                          key={tutor.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedTutor === tutor.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => setSelectedTutor(tutor.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                              <Image
                                src={tutor.image || "/placeholder.svg"}
                                alt={tutor.name}
                                width={80}
                                height={80}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{tutor.name}</h3>
                              <p className="text-sm text-gray-600">{tutor.subject}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < Math.floor(tutor.rating)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">({tutor.reviews})</span>
                              </div>
                            </div>
                            <div className="ml-auto text-right">
                              <div className="font-semibold">${tutor.hourlyRate}/hr</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={!selectedDate || !selectedTime || !selectedTutor}>
                    Book Session
                  </Button>
                </form>
              </div>

              {/* Booking summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>

                {selectedTutor ? (
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Tutor</div>
                      <div className="font-medium">{availableTutors.find((t) => t.id === selectedTutor)?.name}</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-1">Subject</div>
                      <div className="font-medium">
                        {subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : "Not selected"}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-1">Date & Time</div>
                      <div className="font-medium">
                        {selectedDate
                          ? new Date(selectedDate).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Not selected"}
                        {selectedTime ? `, ${selectedTime}` : ""}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Session Fee:</span>
                        <span className="font-semibold">
                          ${availableTutors.find((t) => t.id === selectedTutor)?.hourlyRate}.00
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">Select a tutor to see booking details</div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

