"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, Star, DollarSign, MessageSquare, Settings, LogOut } from "lucide-react"

export function StudentSidebar() {
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
          ND
        </div>
        <div>
          <h3 className="font-medium">Nolan Dino</h3>
          <p className="text-xs text-gray-500">Student</p>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/student"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/student") &&
                !isActive("/student/bookings") &&
                !isActive("/student/ratings") &&
                !isActive("/student/payments") &&
                !isActive("/student/messages") &&
                !isActive("/student/settings")
                  ? "text-blue-600 font-medium bg-blue-50"
                  : "text-gray-600"
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/student/booked"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/student/bookings") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <Calendar size={18} />
              <span>Bookings</span>
            </Link>
          </li>
          <li>
            <Link
              href="/student/rating"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/student/ratings") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <Star size={18} />
              <span>Ratings</span>
            </Link>
          </li>
          <li>
            <Link
              href="/student/payment"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/student/payments") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <DollarSign size={18} />
              <span>Payments</span>
            </Link>
          </li>
          <li>
            <Link
              href="/student"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/student/messages") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <MessageSquare size={18} />
              <span>Messages</span>
            </Link>
          </li>
          <li>
            <Link
              href="/student/settings"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/student/settings") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
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

