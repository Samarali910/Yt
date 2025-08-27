"use client"
import React from "react"
import { useState, useEffect } from "react"
import { SummaryCards } from "./summary-cards"
import { DataTable } from "./data-table"
import { DataCards } from "./data-cards"
import { CreateEditModal } from "./create-edit-modal"
import { DeleteConfirmModal } from "./delete-confirm-modal"
 

export function CrudInterface() {
  const [users, setUsers] = useState([])
  const [viewMode, setViewMode] = useState("table")
  const [selectedUsers, setSelectedUsers] = useState([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, userIds: [], isLoading: false })


  const [searchTerm, setSearchTerm] = useState("")

  // Initialize with sample data
  useEffect(() => {
    const sampleUsers = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "active",
        createdAt: "2024-01-15",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "active",
        createdAt: "2024-01-20",
      },
      {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "User",
        status: "pending",
        createdAt: "2024-01-25",
      },
      {
        id: "4",
        name: "Alice Brown",
        email: "alice@example.com",
        role: "Moderator",
        status: "inactive",
        createdAt: "2024-01-30",
      },
    ]
    setUsers(sampleUsers)
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setUsers((prev) => [...prev, newUser])
    setIsCreateModalOpen(false)
  }

  const handleUpdateUser = (userData) => {
    if (!editingUser) return

    setUsers((prev) => prev.map((user) => (user.id === editingUser.id ? { ...user, ...userData } : user)))
    setEditingUser(null)
  }

  const handleDeleteUsers = async (userIds) => {
    setDeleteConfirm((prev) => ({ ...prev, isLoading: true }))

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setUsers((prev) => prev.filter((user) => !userIds.includes(user.id)))
    setSelectedUsers((prev) => prev.filter((id) => !userIds.includes(id)))
    setDeleteConfirm({ isOpen: false, userIds: [], isLoading: false })
  }

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return
    setDeleteConfirm({ isOpen: true, userIds: selectedUsers, isLoading: false })
  }

  const handleSingleDelete = (userId) => {
    setDeleteConfirm({ isOpen: true, userIds: [userId], isLoading: false })
  }

  const getSelectedUserObjects = () => {
    return users.filter((user) => deleteConfirm.userIds.includes(user.id))
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage your users and their permissions</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-primary cursor-pointer text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Add New User
        </button>
      </div>

      {/* Summary Cards */}
      <SummaryCards users={users} />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {selectedUsers.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg hover:bg-destructive/90 transition-colors font-medium"
            >
              Delete Selected ({selectedUsers.length})
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === "table"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === "cards"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      {/* Data Display */}
      {viewMode === "table" ? (
        <DataTable
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onSelectionChange={setSelectedUsers}
          onEdit={setEditingUser}
          onDelete={handleSingleDelete}
        />
      ) : (
        <DataCards
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onSelectionChange={setSelectedUsers}
          onEdit={setEditingUser}
          onDelete={handleSingleDelete}
        />
      )}

      {/* Modals */}
      <CreateEditModal
        isOpen={isCreateModalOpen || !!editingUser}
        onClose={() => {
          setIsCreateModalOpen(false)
          setEditingUser(null)
        }}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        user={editingUser}
        title={editingUser ? "Edit User" : "Create New User"}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        isLoading={deleteConfirm.isLoading}
        userCount={deleteConfirm.userIds.length}
        selectedUsers={getSelectedUserObjects()} // Pass selected user objects to show names
        onConfirm={() => handleDeleteUsers(deleteConfirm.userIds)}
        onCancel={() => setDeleteConfirm({ isOpen: false, userIds: [], isLoading: false })}
      />
    </div>
  )
}
