"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, Users, DollarSign, BarChart, Settings, LogOut } from "lucide-react"

export function AdminSidebar() {
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
          AD
        </div>
        <div>
          <h3 className="font-medium">Admin Panel</h3>
          <p className="text-xs text-gray-500">System Administrator</p>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/admin"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/admin") &&
                !isActive("/admin/users") &&
                !isActive("/admin/payments") &&
                !isActive("/admin/reports") &&
                !isActive("/admin/settings")
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
              href="/admin/users"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/admin/users") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <Users size={18} />
              <span>Users Management</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/payments"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/admin/payments") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <DollarSign size={18} />
              <span>Payments Management</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/reports"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/admin/reports") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
              }`}
            >
              <BarChart size={18} />
              <span>Platform Reports</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/settings"
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 ${
                isActive("/admin/settings") ? "text-blue-600 font-medium bg-blue-50" : "text-gray-600"
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

