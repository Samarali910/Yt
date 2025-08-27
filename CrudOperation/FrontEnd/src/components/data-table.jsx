"use client"
import React from "react"
 
export function DataTable({ users, selectedUsers, onSelectionChange, onEdit, onDelete }) {
  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(users.map((user) => user.id))
    } else {
      onSelectionChange([])
    }
  }

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

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={users.length > 0 && selectedUsers.length === users.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </th>
              <th className="text-left p-4 font-semibold text-foreground">Name</th>
              <th className="text-left p-4 font-semibold text-foreground">Email</th>
              <th className="text-left p-4 font-semibold text-foreground">Role</th>
              <th className="text-left p-4 font-semibold text-foreground">Status</th>
              <th className="text-left p-4 font-semibold text-foreground">Created</th>
              <th className="text-right p-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`border-b border-border transition-all duration-200 ${
                  selectedUsers.includes(user.id)
                    ? "bg-primary/5 border-primary/20" // Highlight selected rows
                    : "hover:bg-muted/50"
                }`}
              >
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                      className="w-4 h-4 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </td>
                <td className="p-4 font-semibold text-foreground">{user.name}</td>
                <td className="p-4 text-foreground">{user.email}</td>
                <td className="p-4 text-foreground font-medium">{user.role}</td>
                <td className="p-4">{getStatusBadge(user.status)}</td>
                <td className="p-4 text-foreground font-medium">{user.createdAt}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 group"
                      title="Edit user"
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
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200 group"
                      title="Delete user"
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
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-lg font-medium">No users found</p>
          <p className="text-sm">Get started by creating your first user.</p>
        </div>
      )}

      {users.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
          <div className="text-sm text-muted-foreground">
            Showing {users.length} of {users.length} users
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-sm border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md">1</span>
            <button
              className="px-3 py-1 text-sm border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
