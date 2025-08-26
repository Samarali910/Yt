import React, { useEffect } from "react";
import { useState } from "react";

const Formvalidation = () => {
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
  });

  const [error, setError] = useState({});
  const [focusfield, setfocusField] = useState(null);
  const [completionpercentage, setCompletionPersentage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "company",
      "position",
      "city",
      "zipCode",
      "country",
    ];

    const fillfields = requiredFields.filter(
      (field) => formData[field].trim() !== ""
    );
    const progressPersentage = Math.floor(
      (fillfields.length / requiredFields.length) * 100
    );
    setCompletionPersentage(progressPersentage);
  }, [formData]);

  const handlefocues = (field) => {
    setfocusField(field);
  };

  const handleValidation = (field, value) => {
    switch (field) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.length < 2) return "first name must be at least 2 character";
        return undefined;

      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (value.length < 2) return "Last name must be at least 2 character";
        return undefined;

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return undefined;

      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^[+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-()]/g, "")))
          return "Please enter a valid phone number";
        return undefined;

      case "company":
        if (!value.trim()) return "Company name is required";
        if (value.length < 2)
          return "Company name must be at least 2 character";
        return undefined;

      case "position":
        if (!value.trim()) return "position name is required";
        if (value.length < 2)
          return "position name must be at least 2 character";
        return undefined;

      case "city":
        if (!value.trim()) return "city name is required";
        if (value.length < 2) return "city name must be at least 2 character";
        return undefined;

      case "zipCode":
        if (!value.trim()) return "zipCode name is required";

        if (!/^\d{6}$/.test(value))
          return "Please enter a valid 6-digit ZIP code";
        return undefined;

      case "country":
        if (!value.trim()) return "country name is required";
        if (value.length < 2)
          return "country name must be at least 2 character";
        return undefined;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = handleValidation(name, value);
    setError((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (fieldname) => {
    const error = handleValidation(fieldname, formData[fieldname]);
    setError((prev) => ({ ...prev, [fieldname]: error }));
    setfocusField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-black min-h-screen flex justify-center items-center p-4">
        <div className="border border-green-500 bg-transparent  w-full max-w-md text-center p-8">
          <div className="">
            <div className="border-2 border-green-500">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-black flex justify-center items-center">
      <div className="w-full max-w-4xl border border-white p-8">
        <div className="text-white text-center">
          <h1 className="font-bold text-3xl mb-3">
            Professional Registration Form
          </h1>
          <p className="text-gray-400 font-semibold">
            Please fill out all required fields below
          </p>

          <div className="mt-8">
            <div className="flex justify-between">
              <span className="text-gray-400">Form Completion</span>
              <span className="text-white">{completionpercentage}%</span>
            </div>
     
            <div className="w-full mt-2 bg-gray-700 ">
              <div
                className={`h-2 transition-all duration-300
                         ${
                           completionpercentage === 100
                             ? "bg-green-500"
                             : "bg-blue-400"
                         }
                      `}
                style={{ width: `${completionpercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-3">
              <label htmlFor="firstNamer" className="text-white block">
                firt Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className={`w-full px-4 py-3 text-white placeholder-gray-400 
                            focus:outline-none border
                            focus:border-white transition-all  duration-300
                            ${
                              focusfield === "firstName"
                                ? "shadow-lg shadow-blue-500/20"
                                : ""
                            }
                            ${
                              error.firstName
                                ? "border border-red-500 animate-pulse"
                                : ""
                            }
                            ${
                              formData.firstName && !error.firstName
                                ? "border border-green-500"
                                : "border border-gray-400"
                            }
                             }
                            `}
                placeholder="Enter your first name"
                onBlur={() => handleBlur("firstName")}
                onFocus={() => handlefocues("firstName")}
                onChange={(e) => handleChange(e)}
              />

              {error.firstName && (
                <span className="text-red-400 text-sm mt-1 animate-bounce">
                  {error.firstName}
                </span>
              )}
              {formData.firstName && !error.firstName && (
                <span className="mt-2 text-green-500">✓ Looks good!</span>
              )}
            </div>

            <div>
              <div className="space-y-3">
                <label htmlFor="lastName" className="text-white block">
                  last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`w-full px-4 py-3 text-white placeholder-gray-400 
                            focus:outline-none border
                            focus:border-white transition-all  duration-300
                            ${
                              focusfield === "lastName"
                                ? "shadow-lg shadow-blue-500/20"
                                : ""
                            }
                            ${
                              error.lastName
                                ? "border border-red-500 animate-pulse"
                                : ""
                            }
                            ${
                              formData.lastName && !error.lastName
                                ? "border border-green-500"
                                : "border border-gray-400"
                            }
                             }
                            `}
                  placeholder="Enter your first name"
                  onBlur={() => handleBlur("lastName")}
                  onFocus={() => handlefocues("lastName")}
                  onChange={(e) => handleChange(e)}
                />

                {error.lastName && (
                  <span className="text-red-400 text-sm mt-1 animate-bounce">
                    {error.lastName}
                  </span>
                )}
                {formData.lastName && !error.lastName && (
                  <span className="mt-2 text-green-500">✓ Perfect!</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-3">
              <label htmlFor="email" className="text-white block">
                Email*
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className={`w-full px-4 py-3 text-white placeholder-gray-400 
                            focus:outline-none border
                            focus:border-white transition-all  duration-300
                            ${
                              focusfield === "email"
                                ? "shadow-lg shadow-blue-500/20"
                                : ""
                            }
                            ${
                              error.email
                                ? "border border-red-500 animate-pulse"
                                : ""
                            }
                            ${
                              formData.email && !error.email
                                ? "border border-green-500"
                                : "border border-gray-400"
                            }
                             }
                            `}
                placeholder="Enter your first name"
                onBlur={() => handleBlur("email")}
                onFocus={() => handlefocues("email")}
                onChange={(e) => handleChange(e)}
              />

              {error.email && (
                <span className="text-red-400 text-sm mt-1 animate-bounce">
                  {error.email}
                </span>
              )}
              {formData.email && !error.email && (
                <span className="mt-2 text-green-500">✓ Valid email!</span>
              )}
            </div>

            <div>
              <div className="space-y-3">
                <label htmlFor="phone" className="text-white block">
                  Phone*
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className={`w-full px-4 py-3 text-white placeholder-gray-400 
                            focus:outline-none border
                            focus:border-white transition-all  duration-300
                            ${
                              focusfield === "phone"
                                ? "shadow-lg shadow-blue-500/20"
                                : ""
                            }
                            ${
                              error.phone
                                ? "border border-red-500 animate-pulse"
                                : ""
                            }
                            ${
                              formData.phone && !error.phone
                                ? "border border-green-500"
                                : "border border-gray-400"
                            }
                             }
                            `}
                  placeholder="Enter your first name"
                  onBlur={() => handleBlur("phone")}
                  onFocus={() => handlefocues("phone")}
                  onChange={(e) => handleChange(e)}
                />

                {error.phone && (
                  <span className="text-red-400 text-sm mt-1 animate-bounce">
                    {error.phone}
                  </span>
                )}

                {formData.phone && !error.phone && (
                  <span className="mt-2 text-green-500">✓ Great!</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-3">
              <label htmlFor="company" className="text-white block">
                company*
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className={`w-full px-4 py-3 text-white placeholder-gray-400 
                            focus:outline-none border
                            focus:border-white transition-all  duration-300
                            ${
                              focusfield === "company"
                                ? "shadow-lg shadow-blue-500/20"
                                : ""
                            }
                            ${
                              error.company
                                ? "border border-red-500 animate-pulse"
                                : ""
                            }
                            ${
                              formData.company && !error.company
                                ? "border border-green-500"
                                : "border border-gray-400"
                            }
                             }
                            `}
                placeholder="Enter your first name"
                onBlur={() => handleBlur("company")}
                onFocus={() => handlefocues("company")}
                onChange={(e) => handleChange(e)}
              />

              {error.company && (
                <span className="text-red-400 text-sm mt-1 animate-bounce">
                  {error.company}
                </span>
              )}
              {formData.company && !error.company && (
                <span className="mt-2 text-green-500">✓ Nice company!</span>
              )}
            </div>

            <div>
              <div className="space-y-3">
                <label htmlFor="position " className="text-white block">
                  position *
                </label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  className={`w-full px-4 py-3 text-white placeholder-gray-400 
                            focus:outline-none border
                            focus:border-white transition-all  duration-300
                            ${
                              focusfield === "position "
                                ? "shadow-lg shadow-blue-500/20"
                                : ""
                            }
                            ${
                              error.position
                                ? "border border-red-500 animate-pulse"
                                : ""
                            }
                            ${
                              formData.position && !error.position
                                ? "border border-green-500"
                                : "border border-gray-400"
                            }
                             }
                            `}
                  placeholder="Enter your first name"
                  onBlur={() => handleBlur("position")}
                  onFocus={() => handlefocues("position")}
                  onChange={(e) => handleChange(e)}
                />

                {error.position && (
                  <span className="text-red-400 text-sm mt-1 animate-bounce">
                    {error.position}
                  </span>
                )}

                {formData.position && !error.position && (
                  <span className="mt-2 text-green-500">✓ Great!</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-3">
              <label htmlFor="website " className="text-white block">
                Website (Optional)
              </label>
              <input
                type="text"
                name="website "
                id="website "
                className={`w-full px-4 py-3 text-white placeholder-gray-400 
                            focus:outline-none border
                            focus:border-white transition-all  duration-300
                            ${
                              focusfield === "website "
                                ? "shadow-lg shadow-blue-500/20"
                                : ""
                            }
                            ${
                              error.website
                                ? "border border-red-500 animate-pulse"
                                : ""
                            }
                            ${
                              formData.website && !error.website
                                ? "border border-green-500"
                                : "border border-gray-400"
                            }
                             }
                            `}
                placeholder="Enter your first name"
                onBlur={() => handleBlur("website")}
                onFocus={() => handlefocues("website")}
                onChange={(e) => handleChange(e)}
              />

              {error.website && (
                <span className="text-red-400 text-sm mt-1 animate-bounce">
                  {error.website}
                </span>
              )}

              {formData.website && !error.website && (
                <span className="mt-2 text-green-500">✓ Great!</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="space-y-3">
              <label htmlFor="City *" className="text-white block">
                City *
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className={`w-full px-4 py-3 text-white placeholder-gray-400 
                            focus:outline-none border
                            focus:border-white transition-all  duration-300
                            ${
                              focusfield === "city"
                                ? "shadow-lg shadow-blue-500/20"
                                : ""
                            }
                            ${
                              error.city
                                ? "border border-red-500 animate-pulse"
                                : ""
                            }
                            ${
                              formData.city && !error.city
                                ? "border border-green-500"
                                : "border border-gray-400"
                            }
                             }
                            `}
                placeholder="Enter your first name"
                onBlur={() => handleBlur("city")}
                onFocus={() => handlefocues("city")}
                onChange={(e) => handleChange(e)}
              />

              {error.city && (
                <span className="text-red-400 text-sm mt-1 animate-bounce">
                  {error.city}
                </span>
              )}
              {formData.city && !error.city && (
                <span className="mt-2 text-green-500">✓ Nice city!</span>
              )}
            </div>

            <div>
              <div className="space-y-3">
                <label htmlFor="zipCode" className="text-white block">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  className={`w-full px-4 py-3 text-white placeholder-gray-400 
                            focus:outline-none border
                            focus:border-white transition-all  duration-300
                            ${
                              focusfield === "zipCode"
                                ? "shadow-lg shadow-blue-500/20"
                                : ""
                            }
                            ${
                              error.zipCode
                                ? "border border-red-500 animate-pulse"
                                : ""
                            }
                            ${
                              formData.zipCode && !error.zipCode
                                ? "border border-green-500"
                                : "border border-gray-400"
                            }
                             }
                            `}
                  placeholder="123456"
                  onBlur={() => handleBlur("zipCode")}
                  onFocus={() => handlefocues("zipCode")}
                  onChange={(e) => handleChange(e)}
                />

                {error.zipCode && (
                  <span className="text-red-400 text-sm mt-1 animate-bounce">
                    {error.zipCode}
                  </span>
                )}

                {formData.zipCode && !error.zipCode && (
                  <span className="mt-2 text-green-500">✓ Great!</span>
                )}
              </div>
            </div>

            <div>
              <div className="space-y-3">
                <label htmlFor="country" className="text-white block">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className={`w-full px-4 py-3 text-white placeholder-gray-400 
                            focus:outline-none border
                            focus:border-white transition-all  duration-300
                            ${
                              focusfield === "country"
                                ? "shadow-lg shadow-blue-500/20"
                                : ""
                            }
                            ${
                              error.country
                                ? "border border-red-500 animate-pulse"
                                : ""
                            }
                            ${
                              formData.country && !error.country
                                ? "border border-green-500"
                                : "border border-gray-400"
                            }
                             }
                            `}
                  placeholder="Enter your first name"
                  onBlur={() => handleBlur("country")}
                  onFocus={() => handlefocues("country")}
                  onChange={(e) => handleChange(e)}
                />

                {error.country && (
                  <span className="text-red-400 text-sm mt-1 animate-bounce">
                    {error.country}
                  </span>
                )}

                {formData.country && !error.country && (
                  <span className="mt-2 text-green-500">✓ Great!</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-3">
              <label htmlFor="message" className="text-white block">
                message *
              </label>
              <textarea
                type="text"
                name="message"
                id="message"
                className={`w-full px-4 py-3 text-white placeholder-gray-400 
                            focus:outline-none border
                            focus:border-white transition-all  duration-300 min-h-[120px]
                            resize-none
                            ${
                              focusfield === "message"
                                ? "shadow-lg shadow-blue-500/20"
                                : ""
                            }
                            ${
                              error.message
                                ? "border border-red-500 animate-pulse"
                                : ""
                            }
                            ${
                              formData.message && !error.message
                                ? "border border-green-500"
                                : "border border-gray-400"
                            }
                             }
                            `}
                placeholder="Enter your first name"
                onBlur={() => handleBlur("message")}
                onFocus={() => handlefocues("message")}
                onChange={(e) => handleChange(e)}
              />

              {formData.message && (
                <span className="mt-2 text-blue-400 ">
                  💬 Thanks for the additional info!
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-4 text-white text-xl font-semibold  mt-6 cursor-pointer
              ${
                completionpercentage < 100
                  ? "border border-gray-500"
                  : "border border-green-500 hover:bg-green-600 transition-all duration-300 animate-pulse"
              }
            `}
            disabled={completionpercentage < 100}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 "></div>
                Submitting Your Amazing Form...
              </div>
            ) : completionpercentage === 100 ? (
              "🚀 Submit Registration (Ready!)"
            ) : (
              `Complete form (${completionpercentage}% Done)`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Formvalidation;
