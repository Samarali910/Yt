"use client"

 
import React from "react"
 

export function DataCards({ users, selectedUsers, onSelectionChange, onEdit, onDelete,getCurrentDate }) {
  
  const handleSelectUser = (userId, checked) => {
    if (checked) {
      onSelectionChange([...selectedUsers, userId])
    } else {
      onSelectionChange(selectedUsers.filter((id) => id !== userId))
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      inactive: "bg-red-100 text-red-800 border-red-200",
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getAvatarGradient = (index) => {
    const gradients = [
      "bg-gradient-to-br from-blue-400 to-blue-600",
      "bg-gradient-to-br from-green-400 to-green-600",
      "bg-gradient-to-br from-purple-400 to-purple-600",
      "bg-gradient-to-br from-pink-400 to-pink-600",
      "bg-gradient-to-br from-indigo-400 to-indigo-600",
      "bg-gradient-to-br from-yellow-400 to-yellow-600",
      "bg-gradient-to-br from-red-400 to-red-600",
      "bg-gradient-to-br from-teal-400 to-teal-600",
    ]
    return gradients[index % gradients.length]
  }

  const getCardGradient = (index) => {
    const gradients = [
      "bg-gradient-to-br from-blue-50 to-blue-100",
      "bg-gradient-to-br from-green-50 to-green-100",
      "bg-gradient-to-br from-purple-50 to-purple-100",
      "bg-gradient-to-br from-pink-50 to-pink-100",
      "bg-gradient-to-br from-indigo-50 to-indigo-100",
      "bg-gradient-to-br from-yellow-50 to-yellow-100",
      "bg-gradient-to-br from-red-50 to-red-100",
      "bg-gradient-to-br from-teal-50 to-teal-100",
    ]
    return gradients[index % gradients.length]
  }

  if (users.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 mb-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <p className="text-lg font-medium text-foreground">No users found</p>
        <p className="text-sm text-muted-foreground">Get started by creating your first user.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user, index) => (
          <div
            key={user._id}
            className={`${getCardGradient(index)} border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 ${
              selectedUsers.includes(user._id)
                ? "border-primary ring-2 ring-primary/20 bg-primary/5" // Enhanced selection styling
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 ${getAvatarGradient(index)} text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md`}
                >
                  {getInitials(user.name)}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{user.role}</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={(e) => handleSelectUser(user._id, e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Email</p>
                <p className="text-sm font-semibold text-foreground">{user.email}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Status</p>
                  <div className="mt-1">{getStatusBadge(user.status)}</div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Created</p>
                  <p className="text-sm font-semibold text-foreground">{getCurrentDate(user.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border">
              <button
                onClick={() => onEdit(user)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 font-medium group"
              >
                <svg
                  className="h-4 w-4 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200 font-medium group"
              >
                <svg
                  className="h-4 w-4 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length > 0 && (
        <div className="flex items-center justify-between mt-6 p-4 bg-card border border-border rounded-lg">
          <div className="text-sm text-muted-foreground font-medium">
            Showing {users.length} of {users.length} users
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50 font-medium"
              disabled
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md font-medium">1</span>
            <button
              className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50 font-medium"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  )
}
