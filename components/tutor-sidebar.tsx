"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, UserCircle, DollarSign, ClipboardList, Settings, LogOut } from "lucide-react"

export function TutorSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    router.push("/login")
  }

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  return (
    <aside className="w-64 bg-white shadow-sm flex flex-col">
      <div className="p-4 flex items-center gap-3 bg-blue-100">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          JS
        </div>
        <div>
          <h3 className="font-medium">John</h3>
          <p className="text-xs text-gray-500">Math Tutor</p>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                pathname === "/dashboard" ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/bookings"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/dashboard/bookings") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <Calendar size={18} />
              <span>Bookings</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/profile"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/dashboard/profile") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <UserCircle size={18} />
              <span>Profile Management</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/earnings"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/dashboard/earnings") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <DollarSign size={18} />
              <span>Earnings</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/dashboard/quiz-results") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <ClipboardList size={18} />
              <span>Quiz Results</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/dashboard/settings") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 w-full rounded-md hover:bg-red-50 text-red-600"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

