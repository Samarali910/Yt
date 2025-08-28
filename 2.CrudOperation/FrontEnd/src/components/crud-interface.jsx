"use client";
import React from "react";
import { useState, useEffect } from "react";
import { SummaryCards } from "./summary-cards";
import { DataTable } from "./data-table";
import { DataCards } from "./data-cards";
import { CreateEditModal } from "./create-edit-modal";
import { DeleteConfirmModal } from "./delete-confirm-modal";
import { toast } from "react-toastify";
import {
  createUser,
  deleteBulkUser,
  deleteUser,
  getAllUsers,
} from "../apiservices/Apiservices";

export function CrudInterface() {
  const [users, setUsers] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    userIds: [],
    isLoading: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [loader, setLoader] = useState(false);

  const getUsers = async () => {
    const response = await getAllUsers();
    if (response.users.length > 0) {
      setUsers(response?.users);
    }
  };
  // Initialize with sample data
 
  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = async (userData) => {
    setLoader(true);
    const newUser = {
      ...userData,
    };
    const response = await createUser(newUser);

 
    if (response.Success) {
        toast.success("User created Successfully");  
       getUsers();
       setLoader(false);
       setIsCreateModalOpen(false);
    }
     setUsers((prev) => [...prev, newUser]);
  };

  function getCurrentDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleUpdateUser = (userData) => {
    if (!editingUser) return;
    setUsers((prev) =>
      prev.map((user) =>
        user.id === editingUser.id ? { ...user, ...userData } : user
      )
    );
    setEditingUser(null);
  };

  const handleDeleteUsers = async (userIds) => {
    setDeleteConfirm((prev) => ({ ...prev, isLoading: true }));
    setSelectedUsers((prev) => prev.filter((id) => !userIds.includes(id)));
    if (deleteConfirm.userIds.length == 1) {
      const response = await deleteUser(deleteConfirm?.userIds[0]);
      if (response) {
         toast.success("user Deleted Successfully")
        await getUsers();
        setDeleteConfirm({ isOpen: false, userIds: [], isLoading: false });
      }
    } else {
      setDeleteConfirm({
        isOpen: true,
        userIds: selectedUsers,
        isLoading: true,
      });

      const response = await deleteBulkUser(deleteConfirm.userIds);
      if (response) {
        toast.success("Bulk Deleted Successfully")
        setDeleteConfirm({
          isOpen: false,
          userIds: [],
          isLoading: false,
        });
        await getUsers();
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    setDeleteConfirm({
      isOpen: true,
      userIds: selectedUsers,
      isLoading: false,
    });
  };

  const handleSingleDelete = async (userId) => {
    setDeleteConfirm({ isOpen: true, userIds: [userId], isLoading: false });
  };

  const getSelectedUserObjects = () => {
    return users.filter((user) => deleteConfirm.userIds.includes(user._id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your users and their permissions
          </p>
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
          getCurrentDate={getCurrentDate}
          loader={loader}
        />
      ) : (
        <DataCards
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onSelectionChange={setSelectedUsers}
          onEdit={setEditingUser}
          onDelete={handleSingleDelete}
          getCurrentDate={getCurrentDate}
        />
      )}

      {/* Modals */}
      <CreateEditModal
        isOpen={isCreateModalOpen || !!editingUser}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        user={editingUser}
        title={editingUser ? "Edit User" : "Create New User"}
        loader={loader}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        isLoading={deleteConfirm.isLoading}
        userCount={deleteConfirm.userIds.length}
        selectedUsers={getSelectedUserObjects()} // Pass selected user objects to show names
        onConfirm={() => handleDeleteUsers(deleteConfirm.userIds)}
        onCancel={() =>
          setDeleteConfirm({ isOpen: false, userIds: [], isLoading: false })
        }
      />
    </div>
  );
}
