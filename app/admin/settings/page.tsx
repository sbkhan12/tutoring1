"use client"

import type React from "react"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Search, Bell, Save } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "Tutoring Anything",
    supportEmail: "support@tutoringanything.com",
    timezone: "UTC-5",
    language: "en",
    maintenanceMode: false,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newUserAlerts: true,
    paymentAlerts: true,
    systemAlerts: true,
    marketingEmails: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordPolicy: "medium",
    ipRestriction: false,
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleToggleChange = (
    setting: string,
    value: boolean,
    settingType: "general" | "notification" | "security",
  ) => {
    if (settingType === "general") {
      setGeneralSettings((prev) => ({ ...prev, [setting]: value }))
    } else if (settingType === "notification") {
      setNotificationSettings((prev) => ({ ...prev, [setting]: value }))
    } else if (settingType === "security") {
      setSecuritySettings((prev) => ({ ...prev, [setting]: value }))
    }
  }

  const handleSelectChange = (value: string, setting: string) => {
    setSecuritySettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleSaveSettings = () => {
    
    console.log("Saving settings:", { generalSettings, notificationSettings, securitySettings })
    
    alert("Settings saved successfully!")
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

          {/* Settings content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Platform Settings</h1>
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="platformName">Platform Name</Label>
                      <Input
                        id="platformName"
                        name="platformName"
                        value={generalSettings.platformName}
                        onChange={handleGeneralChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input
                        id="supportEmail"
                        name="supportEmail"
                        type="email"
                        value={generalSettings.supportEmail}
                        onChange={handleGeneralChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Default Timezone</Label>
                      <Select
                        value={generalSettings.timezone}
                        onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, timezone: value }))}
                      >
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                          <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Select
                        value={generalSettings.language}
                        onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, language: value }))}
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

                  <div className="flex items-center space-x-2 pt-4">
                    <Switch
                      id="maintenanceMode"
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => handleToggleChange("maintenanceMode", checked, "general")}
                    />
                    <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="emailNotifications"
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) =>
                            handleToggleChange("emailNotifications", checked, "notification")
                          }
                        />
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                      </div>
                      <span className="text-sm text-gray-500">Receive email notifications for important updates</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="newUserAlerts"
                          checked={notificationSettings.newUserAlerts}
                          onCheckedChange={(checked) => handleToggleChange("newUserAlerts", checked, "notification")}
                        />
                        <Label htmlFor="newUserAlerts">New User Alerts</Label>
                      </div>
                      <span className="text-sm text-gray-500">Get notified when new users register</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="paymentAlerts"
                          checked={notificationSettings.paymentAlerts}
                          onCheckedChange={(checked) => handleToggleChange("paymentAlerts", checked, "notification")}
                        />
                        <Label htmlFor="paymentAlerts">Payment Alerts</Label>
                      </div>
                      <span className="text-sm text-gray-500">Get notified about payment activities</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="systemAlerts"
                          checked={notificationSettings.systemAlerts}
                          onCheckedChange={(checked) => handleToggleChange("systemAlerts", checked, "notification")}
                        />
                        <Label htmlFor="systemAlerts">System Alerts</Label>
                      </div>
                      <span className="text-sm text-gray-500">Get notified about system updates and maintenance</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="marketingEmails"
                          checked={notificationSettings.marketingEmails}
                          onCheckedChange={(checked) => handleToggleChange("marketingEmails", checked, "notification")}
                        />
                        <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      </div>
                      <span className="text-sm text-gray-500">Receive promotional emails and newsletters</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        name="sessionTimeout"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings((prev) => ({ ...prev, sessionTimeout: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passwordPolicy">Password Policy</Label>
                      <Select
                        value={securitySettings.passwordPolicy}
                        onValueChange={(value) => handleSelectChange(value, "passwordPolicy")}
                      >
                        <SelectTrigger id="passwordPolicy">
                          <SelectValue placeholder="Select policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - 6+ characters</SelectItem>
                          <SelectItem value="medium">Medium - 8+ chars with numbers</SelectItem>
                          <SelectItem value="high">High - 10+ chars with numbers and symbols</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="twoFactorAuth"
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={(checked) => handleToggleChange("twoFactorAuth", checked, "security")}
                        />
                        <Label htmlFor="twoFactorAuth">Require Two-Factor Authentication</Label>
                      </div>
                      <span className="text-sm text-gray-500">Adds an extra layer of security for all users</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="ipRestriction"
                          checked={securitySettings.ipRestriction}
                          onCheckedChange={(checked) => handleToggleChange("ipRestriction", checked, "security")}
                        />
                      </div>
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

