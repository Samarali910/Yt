"use client"

import React from "react"

import { useState, useEffect } from "react"
 
export function CreateEditModal({ isOpen, onClose, onSubmit, user, title,loader }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active" ,
  })

  const [errors, setErrors] = useState({})


  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        role: "User",
        status: "Active",
      })
    }
    setErrors({})
  }, [user, isOpen])
   

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }


  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                errors.name ? "border-destructive" : "border-border"
              }`}
              placeholder="Enter full name"
            />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                errors.email ? "border-destructive" : "border-border"
              }`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Role *</label>
            <select
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                errors.role ? "border-destructive" : "border-border"
              }`}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.role && <p className="text-destructive text-sm mt-1">{errors.role}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border text-card-foreground rounded-lg hover:bg-muted/50 transition-colors"
            >
              Cancel
            </button>
           <button
  type="submit"
  disabled={loader} // loader ke time disable karna best practice hai
  className={`flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium`}
>
  {loader ? (
    <div className="flex items-center gap-2">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
      <span>{user ? "Updating..." : "Creating..."}</span>
    </div>
  ) : (
    <span>{user ? "Update User" : "Create User"}</span>
  )}
</button>

          </div>
        </form>
      </div>
    </div>
  )
}
