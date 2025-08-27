 
import React from "react"
 
export function SummaryCards({ users }) {
  const totalUsers = users.length
  const activeUsers = users.filter((user) => user.status === "active").length
  const pendingUsers = users.filter((user) => user.status === "pending").length
  const inactiveUsers = users.filter((user) => user.status === "inactive").length

  const cards = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "All registered users",
      gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
    {
      title: "Active Users",
      value: activeUsers,
      description: "Currently active",
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Pending Users",
      value: pendingUsers,
      description: "Awaiting approval",
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-600",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      description: "Disabled accounts",
      gradient: "bg-gradient-to-br from-red-500 to-pink-600",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.gradient} border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-white`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
              <p className="text-sm text-white/70 mt-1">{card.description}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-white">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
