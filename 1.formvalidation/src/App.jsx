"use client"

import  React from "react"
import { useState, useEffect } from "react"


export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    website: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [touchedFields, setTouchedFields] = useState(new Set())
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [fieldFocus, setFieldFocus] = useState(null)

  useEffect(() => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "company",
      "position",
      "address",
      "city",
      "zipCode",
      "country",
    ]
    const filledFields = requiredFields.filter((field) => formData[field].trim() !== "")
    const percentage = Math.round((filledFields.length / requiredFields.length) * 100)
    setCompletionPercentage(percentage)
  }, [formData])

  const validateField = (field, value) => {
    switch (field) {
      case "firstName":
        if (!value.trim()) return "First name is required"
        if (value.length < 2) return "First name must be at least 2 characters"
        if (!/^[a-zA-Z\s]+$/.test(value)) return "First name can only contain letters"
        return undefined

      case "lastName":
        if (!value.trim()) return "Last name is required"
        if (value.length < 2) return "Last name must be at least 2 characters"
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Last name can only contain letters"
        return undefined

      case "email":
        if (!value.trim()) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address"
        return undefined

      case "phone":
        if (!value.trim()) return "Phone number is required"
        if (!/^[+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-()]/g, ""))) return "Please enter a valid phone number"
        return undefined

      case "company":
        if (!value.trim()) return "Company name is required"
        if (value.length < 2) return "Company name must be at least 2 characters"
        return undefined

      case "position":
        if (!value.trim()) return "Position is required"
        if (value.length < 2) return "Position must be at least 2 characters"
        return undefined

      case "website":
        if (value.trim() && !/^https?:\/\/.+\..+/.test(value)) return "Please enter a valid website URL"
        return undefined

      case "address":
        if (!value.trim()) return "Address is required"
        if (value.length < 5) return "Address must be at least 5 characters"
        return undefined

      case "city":
        if (!value.trim()) return "City is required"
        if (value.length < 2) return "City must be at least 2 characters"
        if (!/^[a-zA-Z\s]+$/.test(value)) return "City can only contain letters"
        return undefined

      case "zipCode":
        if (!value.trim()) return "ZIP code is required"
        if (!/^\d{6}$/.test(value)) return "Please enter a valid 6-digit ZIP code"
        return undefined

      case "country":
        if (!value.trim()) return "Country is required"
        if (value.length < 2) return "Country must be at least 2 characters"
        return undefined

      default:
        return undefined
    }
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    Object.keys(formData).forEach((field) => {
      if (field !== "message") {
        const error = validateField(formData[FormData])
        if (error) {
          newErrors[FormErrors] = error
          isValid = false
        }
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Mark field as touched
    setTouchedFields((prev) => new Set(prev).add(field))

    // Real-time validation for touched fields
    if (touchedFields.has(field) || value.length > 0) {
      const error = validateField(field, value)
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }


  const handleBlur = (field) => {
    setTouchedFields((prev) => new Set(prev).add(field))
    const error = validateField(field, formData[field])
    setErrors((prev) => ({ ...prev, [field]: error }))
    setFieldFocus(null)
  }


                   
  const handleFocus = (field) => {
    setFieldFocus(field)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto bg-transparent border border-green-500 p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">🎉 Form Submitted Successfully!</h2>
            <p className="text-gray-300">Thank you for providing your information. We'll be in touch soon.</p>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                company: "",
                position: "",
                website: "",
                address: "",
                city: "",
                zipCode: "",
                country: "",
                message: "",
              })
              setTouchedFields(new Set())
              setErrors({})
              setCompletionPercentage(0)
            }}
            className="bg-transparent border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition-all duration-300"
          >
            Submit Another Form
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-transparent border border-gray-600 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Professional Registration Form</h1>
          <p className="text-gray-300">Please fill out all required fields below</p>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Form Completion</span>
              <span className="text-sm text-white font-semibold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-700 h-2">
              <div
                className={`h-2 transition-all duration-500 ${
                  completionPercentage === 100 ? "bg-green-500" : "bg-blue-500"
                }`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            {completionPercentage === 100 && (
              <p className="text-green-400 text-sm mt-2 animate-pulse">🎉 All fields completed! Ready to submit!</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-white">
                First Name * {fieldFocus === "firstName" && <span className="text-blue-400">✨</span>}
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}

                onChange={(e) => handleInputChange("firstName", e.target.value)}
                onBlur={() => handleBlur("firstName")}
                
                onFocus={() => handleFocus("firstName")}

                className={`w-full px-4 py-3 bg-transparent border placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                  errors.firstName
                    ? "border-red-500 animate-pulse"
                    : formData.firstName && !errors.firstName
                      ? "border-green-500"
                      : "border-gray-600"
                } ${fieldFocus === "firstName" ? "shadow-lg shadow-blue-500/20" : ""}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.firstName}</p>}
              {formData.firstName && !errors.firstName && <p className="text-green-400 text-sm mt-1">✓ Looks good!</p>}

            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-white">
                Last Name * {fieldFocus === "lastName" && <span className="text-blue-400">✨</span>}
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                onBlur={() => handleBlur("lastName")}
                onFocus={() => handleFocus("lastName")}
                className={`w-full px-4 py-3 bg-transparent border text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                  errors.lastName
                    ? "border-red-500 animate-pulse"
                    : formData.lastName && !errors.lastName
                      ? "border-green-500"
                      : "border-gray-600"
                } ${fieldFocus === "lastName" ? "shadow-lg shadow-blue-500/20" : ""}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.lastName}</p>}
              {formData.lastName && !errors.lastName && <p className="text-green-400 text-sm mt-1">✓ Perfect!</p>}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address * {fieldFocus === "email" && <span className="text-blue-400">✨</span>}
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                onFocus={() => handleFocus("email")}
                className={`w-full px-4 py-3 bg-transparent border text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                  errors.email
                    ? "border-red-500 animate-pulse"
                    : formData.email && !errors.email
                      ? "border-green-500"
                      : "border-gray-600"
                } ${fieldFocus === "email" ? "shadow-lg shadow-blue-500/20" : ""}`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.email}</p>}
              {formData.email && !errors.email && <p className="text-green-400 text-sm mt-1">✓ Valid email!</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-white">
                Phone Number * {fieldFocus === "phone" && <span className="text-blue-400">✨</span>}
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                onFocus={() => handleFocus("phone")}
                className={`w-full px-4 py-3 bg-transparent border text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                  errors.phone
                    ? "border-red-500 animate-pulse"
                    : formData.phone && !errors.phone
                      ? "border-green-500"
                      : "border-gray-600"
                } ${fieldFocus === "phone" ? "shadow-lg shadow-blue-500/20" : ""}`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.phone}</p>}
              {formData.phone && !errors.phone && <p className="text-green-400 text-sm mt-1">✓ Great!</p>}
            </div>
          </div>

          {/* Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-medium text-white">
                Company Name * {fieldFocus === "company" && <span className="text-blue-400">✨</span>}
              </label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                onBlur={() => handleBlur("company")}
                onFocus={() => handleFocus("company")}
                className={`w-full px-4 py-3 bg-transparent border text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                  errors.company
                    ? "border-red-500 animate-pulse"
                    : formData.company && !errors.company
                      ? "border-green-500"
                      : "border-gray-600"
                } ${fieldFocus === "company" ? "shadow-lg shadow-blue-500/20" : ""}`}
                placeholder="Enter your company name"
              />
              {errors.company && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.company}</p>}
              {formData.company && !errors.company && <p className="text-green-400 text-sm mt-1">✓ Nice company!</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="position" className="block text-sm font-medium text-white">
                Position * {fieldFocus === "position" && <span className="text-blue-400">✨</span>}
              </label>
              <input
                id="position"
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                onBlur={() => handleBlur("position")}
                onFocus={() => handleFocus("position")}
                className={`w-full px-4 py-3 bg-transparent border text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                  errors.position
                    ? "border-red-500 animate-pulse"
                    : formData.position && !errors.position
                      ? "border-green-500"
                      : "border-gray-600"
                } ${fieldFocus === "position" ? "shadow-lg shadow-blue-500/20" : ""}`}
                placeholder="Enter your position"
              />
              {errors.position && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.position}</p>}
              {formData.position && !errors.position && <p className="text-green-400 text-sm mt-1">✓ Awesome role!</p>}
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label htmlFor="website" className="block text-sm font-medium text-white">
              Website (Optional) {fieldFocus === "website" && <span className="text-blue-400">✨</span>}
            </label>
            <input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              onBlur={() => handleBlur("website")}
              onFocus={() => handleFocus("website")}
              className={`w-full px-4 py-3 bg-transparent border text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                errors.website
                  ? "border-red-500 animate-pulse"
                  : formData.website && !errors.website
                    ? "border-green-500"
                    : "border-gray-600"
              } ${fieldFocus === "website" ? "shadow-lg shadow-blue-500/20" : ""}`}
              placeholder="https://www.example.com"
            />
            {errors.website && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.website}</p>}
            {formData.website && !errors.website && <p className="text-green-400 text-sm mt-1">✓ Cool website!</p>}
          </div>

          {/* Address Information */}
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-white">
              Street Address * {fieldFocus === "address" && <span className="text-blue-400">✨</span>}
            </label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              onBlur={() => handleBlur("address")}
              onFocus={() => handleFocus("address")}
              className={`w-full px-4 py-3 bg-transparent border text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                errors.address
                  ? "border-red-500 animate-pulse"
                  : formData.address && !errors.address
                    ? "border-green-500"
                    : "border-gray-600"
              } ${fieldFocus === "address" ? "shadow-lg shadow-blue-500/20" : ""}`}
              placeholder="Enter your street address"
            />
            {errors.address && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.address}</p>}
            {formData.address && !errors.address && <p className="text-green-400 text-sm mt-1">✓ Address confirmed!</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-medium text-white">
                City * {fieldFocus === "city" && <span className="text-blue-400">✨</span>}
              </label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                onBlur={() => handleBlur("city")}
                onFocus={() => handleFocus("city")}
                className={`w-full px-4 py-3 bg-transparent border text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                  errors.city
                    ? "border-red-500 animate-pulse"
                    : formData.city && !errors.city
                      ? "border-green-500"
                      : "border-gray-600"
                } ${fieldFocus === "city" ? "shadow-lg shadow-blue-500/20" : ""}`}
                placeholder="Enter your city"
              />
              {errors.city && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.city}</p>}
              {formData.city && !errors.city && <p className="text-green-400 text-sm mt-1">✓ Beautiful city!</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="zipCode" className="block text-sm font-medium text-white">
                ZIP Code * {fieldFocus === "zipCode" && <span className="text-blue-400">✨</span>}
              </label>
              <input
                id="zipCode"
                type="text"
                maxLength={6}
                value={formData.zipCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                  handleInputChange("zipCode", value)
                }}
                onBlur={() => handleBlur("zipCode")}
                onFocus={() => handleFocus("zipCode")}
                className={`w-full px-4 py-3 bg-transparent border text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                  errors.zipCode
                    ? "border-red-500 animate-pulse"
                    : formData.zipCode && !errors.zipCode
                      ? "border-green-500"
                      : "border-gray-600"
                } ${fieldFocus === "zipCode" ? "shadow-lg shadow-blue-500/20" : ""}`}
                placeholder="123456"
              />
              {errors.zipCode && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.zipCode}</p>}
              {formData.zipCode && !errors.zipCode && <p className="text-green-400 text-sm mt-1">✓ Valid ZIP!</p>}
              <p className="text-gray-400 text-xs">6-digit ZIP code required</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-white">
                Country * {fieldFocus === "country" && <span className="text-blue-400">✨</span>}
              </label>
              <input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                onBlur={() => handleBlur("country")}
                onFocus={() => handleFocus("country")}
                className={`w-full px-4 py-3 bg-transparent border text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                  errors.country
                    ? "border-red-500 animate-pulse"
                    : formData.country && !errors.country
                      ? "border-green-500"
                      : "border-gray-600"
                } ${fieldFocus === "country" ? "shadow-lg shadow-blue-500/20" : ""}`}
                placeholder="Enter your country"
              />
              {errors.country && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.country}</p>}
              {formData.country && !errors.country && <p className="text-green-400 text-sm mt-1">✓ Great country!</p>}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-white">
              Additional Message (Optional) {fieldFocus === "message" && <span className="text-blue-400">✨</span>}
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              onFocus={() => handleFocus("message")}
              onBlur={() => setFieldFocus(null)}
              className={`w-full px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 min-h-[120px] resize-none ${
                fieldFocus === "message" ? "shadow-lg shadow-blue-500/20" : ""
              }`}
              placeholder="Tell us anything else you'd like us to know..."
            />
            {formData.message && <p className="text-blue-400 text-sm mt-1">💬 Thanks for the additional info!</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || completionPercentage < 100}
            className={`w-full border text-white py-4 px-6 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed ${
              completionPercentage === 100
                ? "bg-transparent border-green-500 hover:bg-green-500 hover:text-black animate-pulse"
                : "bg-transparent border-gray-500"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting Your Amazing Form...
              </div>
            ) : completionPercentage === 100 ? (
              "🚀 Submit Registration (Ready!)"
            ) : (
              `Complete Form (${completionPercentage}% done)`
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
