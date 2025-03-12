"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { StudentSidebar } from "@/components/student-sidebar"
import { Search, Bell, Save, Upload } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentSettings() {
  const [profileSettings, setProfileSettings] = useState({
    fullName: "Nolan Dino",
    email: "nolan@example.com",
    phone: "(555) 123-4567",
    bio: "I'm a student interested in mathematics and physics.",
    profileImage: "/placeholder.svg?height=100&width=100",
  })

  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    sessionReminders: true,
    paymentReminders: true,
    marketingEmails: false,
    darkMode: false,
    language: "en",
  })

  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showRatings: true,
    showActivity: false,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleToggleChange = (setting: string, value: boolean, settingType: "account" | "privacy") => {
    if (settingType === "account") {
      setAccountSettings((prev) => ({ ...prev, [setting]: value }))
    } else if (settingType === "privacy") {
      setPrivacySettings((prev) => ({ ...prev, [setting]: value }))
    }
  }

  const handleSelectChange = (value: string, setting: string) => {
    setAccountSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to your backend
    console.log("Saving settings:", { profileSettings, accountSettings, privacySettings })
    // Show success message
    alert("Settings saved successfully!")
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

          {/* Settings content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Account Settings</h1>
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="relative mb-4">
                        <Image
                          src={profileSettings.profileImage || "/placeholder.svg"}
                          alt="Profile"
                          width={100}
                          height={100}
                          className="rounded-full"
                        />
                        <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                          <Upload className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">Upload a profile picture (max 2MB)</p>
                    </div>

                    <div className="md:w-2/3 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={profileSettings.fullName}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileSettings.email}
                          onChange={handleProfileChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={profileSettings.phone} onChange={handleProfileChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profileSettings.bio}
                          onChange={handleProfileChange}
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="account" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={accountSettings.language}
                        onValueChange={(value) => handleSelectChange(value, "language")}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="emailNotifications"
                          checked={accountSettings.emailNotifications}
                          onCheckedChange={(checked) => handleToggleChange("emailNotifications", checked, "account")}
                        />
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                      </div>
                      <span className="text-sm text-gray-500">Receive email notifications for important updates</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="smsNotifications"
                          checked={accountSettings.smsNotifications}
                          onCheckedChange={(checked) => handleToggleChange("smsNotifications", checked, "account")}
                        />
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      </div>
                      <span className="text-sm text-gray-500">Receive text message notifications</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="sessionReminders"
                          checked={accountSettings.sessionReminders}
                          onCheckedChange={(checked) => handleToggleChange("sessionReminders", checked, "account")}
                        />
                        <Label htmlFor="sessionReminders">Session Reminders</Label>
                      </div>
                      <span className="text-sm text-gray-500">Get reminders before your tutoring sessions</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="paymentReminders"
                          checked={accountSettings.paymentReminders}
                          onCheckedChange={(checked) => handleToggleChange("paymentReminders", checked, "account")}
                        />
                        <Label htmlFor="paymentReminders">Payment Reminders</Label>
                      </div>
                      <span className="text-sm text-gray-500">Get reminders about upcoming payments</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="marketingEmails"
                          checked={accountSettings.marketingEmails}
                          onCheckedChange={(checked) => handleToggleChange("marketingEmails", checked, "account")}
                        />
                        <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      </div>
                      <span className="text-sm text-gray-500">Receive promotional emails and newsletters</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="darkMode"
                          checked={accountSettings.darkMode}
                          onCheckedChange={(checked) => handleToggleChange("darkMode", checked, "account")}
                        />
                        <Label htmlFor="darkMode">Dark Mode</Label>
                      </div>
                      <span className="text-sm text-gray-500">Use dark theme for the application</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="privacy" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="showProfile"
                          checked={privacySettings.showProfile}
                          onCheckedChange={(checked) => handleToggleChange("showProfile", checked, "privacy")}
                        />
                        <Label htmlFor="showProfile">Show Profile to Tutors</Label>
                      </div>
                      <span className="text-sm text-gray-500">Allow tutors to view your profile information</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="showRatings"
                          checked={privacySettings.showRatings}
                          onCheckedChange={(checked) => handleToggleChange("showRatings", checked, "privacy")}
                        />
                        <Label htmlFor="showRatings">Show Ratings and Reviews</Label>
                      </div>
                      <span className="text-sm text-gray-500">Make your ratings and reviews public</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="showActivity"
                          checked={privacySettings.showActivity}
                          onCheckedChange={(checked) => handleToggleChange("showActivity", checked, "privacy")}
                        />
                        <Label htmlFor="showActivity">Show Activity Status</Label>
                      </div>
                      <span className="text-sm text-gray-500">Show when you're online or last active</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t mt-6">
                    <h3 className="text-lg font-medium mb-4">Data & Privacy</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Download My Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Delete My Account
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

