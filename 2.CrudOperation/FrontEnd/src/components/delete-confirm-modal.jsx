"use client"

 import React from "react"
export function DeleteConfirmModal({
  isOpen,
  isLoading,
  userCount,
  selectedUsers,
  onConfirm,
  onCancel,
}) {

   console.log("selectedUsers",selectedUsers)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="p-6 flex-shrink-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Delete {userCount === 1 ? "User" : `${userCount} Users`}
              </h3>
              <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
            </div>
          </div>

          <p className="text-card-foreground mb-4">
            Are you sure you want to delete {userCount === 1 ? "this user" : `these ${userCount} users`}?
          </p>
 

          {selectedUsers.length > 0 && (
            <div className="mb-4 p-3 bg-muted/30 rounded-lg border">
              <p className="text-sm font-medium text-card-foreground mb-2">Users to be deleted:</p>
              <div className="space-y-1">
                {selectedUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs">({user.email})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-6">
            {userCount === 1 ? "This user" : "These users"} will be permanently removed from the system.
          </p>
        </div>

        <div className="flex gap-3 p-6 pt-0 flex-shrink-0">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-border text-card-foreground rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Deleting...
              </>
            ) : (
              `Delete ${userCount === 1 ? "User" : "Users"}`
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
