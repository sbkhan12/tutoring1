"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roleParam = searchParams?.get("role")

  const [activeTab, setActiveTab] = useState<string>("student")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  useEffect(() => {
    if (roleParam && ["student", "tutor", "admin"].includes(roleParam)) {
      setActiveTab(roleParam)
    }
  }, [roleParam])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Redirect based on role
    if (activeTab === "student") {
      router.push("/student")
    } else if (activeTab === "tutor") {
      router.push("/dashboard")
    } else if (activeTab === "admin") {
      router.push("/admin")
    }
  }

  return (
    <AuthLayout
      title="Welcome to Tutoring Anything!"
      subtitle="Empowering tutors and students to connect and succeed"
      showProgress={false}
      stepTitle="Login"
    >
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="tutor">Tutor</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="rememberMe" className="text-sm">
                Remember Me
              </Label>
            </div>
            <div className="pt-4">
              <Button type="submit" className="w-full rounded-md">
                Login as Student
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="tutor" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="rememberMe" className="text-sm">
                Remember Me
              </Label>
            </div>
            <div className="pt-4">
              <Button type="submit" className="w-full rounded-md">
                Login as Tutor
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="rememberMe" className="text-sm">
                Remember Me
              </Label>
            </div>
            <div className="pt-4">
              <Button type="submit" className="w-full rounded-md">
                Login as Admin
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm text-blue-500 mt-4">
        <Link href="/forgot-password" className="hover:underline">
          Forgot your password?
        </Link>
      </div>

      <div className="text-center text-sm mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  )
}

