"use client"

import { useState } from "react"
import Image from "next/image"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Footer } from "@/components/footer"
import { TutorSidebar } from "@/components/tutor-sidebar"
import { Search, Bell, Upload, Star, Plus, Edit } from "lucide-react"

// Sample data
const initialProfile = {
  name: "John ",
  photo: "/placeholder.svg?height=200&width=200",
  education: [
    {
      degree: "Master of Science in Mathematics",
      institution: "Stanford University",
      year: "2020",
    },
    {
      degree: "Bachelor of Science in Mathematics",
      institution: "MIT",
      year: "2018",
    },
  ],
  certifications: [
    {
      name: "Advanced Teaching Certification",
      issuer: "National Teaching Association",
      year: "2021",
    },
  ],
  fees: {
    hourlyRate: 30,
    groupRate: 25,
    monthlyRate: 200,
  },
  ratings: [
    {
      id: 1,
      student: "student 1",
      rating: 5,
      comment: "Excellent tutor, very patient and knowledgeable.",
      date: "2024-02-15",
    },
    {
      id: 2,
      student: "student 2",
      rating: 5,
      comment: "Great at explaining complex concepts.",
      date: "2024-02-10",
    },
  ],
  availability: [
    { day: "Monday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    { day: "Wednesday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    { day: "Friday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
  ],
  about:
    "Experienced mathematics tutor with over 5 years of teaching experience. Specialized in helping students understand complex mathematical concepts through practical examples and personalized learning approaches.",
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    console.log("Saving profile:", profile)
  }

  const handlePhotoUpload = () => {
    alert("Photo upload functionality would be implemented here")
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
              <h1 className="text-2xl font-semibold">Profile Management</h1>
              <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <Image
                        src={profile.photo || "/placeholder.svg"}
                        alt={profile.name}
                        width={200}
                        height={200}
                        className="rounded-full"
                      />
                      {isEditing && (
                        <button
                          className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full"
                          onClick={handlePhotoUpload}
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold">{profile.name}</h2>
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-500">(5.0)</span>
                    </div>
                  </div>
                </div>

                {/* Fees */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Fees</h2>
                    {isEditing && (
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Hourly Rate</label>
                      <Input
                        type="number"
                        value={profile.fees.hourlyRate}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            fees: { ...profile.fees, hourlyRate: Number.parseInt(e.target.value) },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Group Rate (per student)</label>
                      <Input
                        type="number"
                        value={profile.fees.groupRate}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            fees: { ...profile.fees, groupRate: Number.parseInt(e.target.value) },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Monthly Package</label>
                      <Input
                        type="number"
                        value={profile.fees.monthlyRate}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            fees: { ...profile.fees, monthlyRate: Number.parseInt(e.target.value) },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-6">
                {/* Education & Qualifications */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Education & Qualifications</h2>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="font-medium">{edu.degree}</div>
                        <div className="text-sm text-gray-500">{edu.institution}</div>
                        <div className="text-sm text-gray-500">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Certifications</h2>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-sm text-gray-500">{cert.issuer}</div>
                        <div className="text-sm text-gray-500">{cert.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* About Me */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">About Me</h2>
                    {isEditing && (
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={profile.about}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                    className="min-h-[150px]"
                  />
                </div>

                {/* Availability Calendar */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Availability</h2>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Time Slot
                      </Button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {profile.availability.map((day, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="font-medium">{day.day}</div>
                        {day.slots.map((slot, slotIndex) => (
                          <div key={slotIndex} className="text-sm text-gray-500">
                            {slot}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ratings & Reviews */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Ratings & Reviews</h2>
                  <div className="space-y-4">
                    {profile.ratings.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-medium">{review.student}</div>
                          <div className="flex">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                        <div className="text-xs text-gray-500 mt-1">{new Date(review.date).toLocaleDateString()}</div>
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

