// app/manager/login/page.jsx (for App Router)

"use client"; // Required for client-side interactivity like useState and useRouter

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation in App Router

const ManagerLoginPage = () => {
  const router = useRouter(); // Initialize Next.js router for redirection

  // State variables to hold form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Stores selected role from dropdown
  const [employeeId, setEmployeeId] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  // Define color palette, consistent with your other components
  const colors = {
    backgroundPrimary: "#f8fbfa",
    backgroundSecondary: "#e8f2ec",
    textPrimary: "#0e1a13",
    textSecondary: "#51946b",
    borderColor: "#d1e6d9",
    buttonBackground: "#39e079", // Green button for login
    buttonText: "#0e1a13", // Dark text on green button
  };

  // List of manager roles for the dropdown
  const managerRoles = [
    "Regional Manager",
    "Sustainability Lead",
    "Operations Analyst",
    "Logistics Coordinator",
    "Store Supervisor",
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    setIsLoading(true); // Set loading to true when form is submitted

    setTimeout(() => {
      router.push("/manager/dashboard");
    }, 2000); // Simulate a 2-second delay for redirection
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        backgroundColor: colors.backgroundPrimary,
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <div className="size-8 mr-3" style={{ color: colors.textPrimary }}>
            {/* EcoChain Logo SVG */}
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#0e1a13]">Manager Login</h1>
        </div>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Please enter your credentials.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email Address / Username Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#0e1a13] mb-1"
            >
              Work Email / Username
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51946b] transition duration-150"
              placeholder="e.g., john.doe@walmart.com"
              required
              disabled={isLoading} // Disable input when loading
              style={{
                borderColor: colors.borderColor,
                backgroundColor: colors.backgroundPrimary,
                color: colors.textPrimary,
              }}
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#0e1a13] mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51946b] transition duration-150"
              placeholder="Enter your password"
              required
              disabled={isLoading} // Disable input when loading
              style={{
                borderColor: colors.borderColor,
                backgroundColor: colors.backgroundPrimary,
                color: colors.textPrimary,
              }}
            />
          </div>

          {/* Role/Access Level Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-[#0e1a13] mb-1"
            >
              Your Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select w-full p-3 border rounded-lg appearance-none bg-(image:--select-button-svg) bg-no-repeat bg-right-center focus:outline-none focus:ring-2 focus:ring-[#51946b] transition duration-150"
              required
              disabled={isLoading} // Disable input when loading
              style={{
                borderColor: colors.borderColor,
                backgroundColor: colors.backgroundPrimary,
                color: colors.textPrimary,
                "--select-button-svg": `url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(81,148,107)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')`,
              }}
            >
              <option value="">Select your role</option>
              {managerRoles.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
          </div>

          {/* Employee ID Field */}
          <div className="mb-6">
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-[#0e1a13] mb-1"
            >
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="form-input w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51946b] transition duration-150"
              placeholder="e.g., WLM12345"
              required
              disabled={isLoading} // Disable input when loading
              style={{
                borderColor: colors.borderColor,
                backgroundColor: colors.backgroundPrimary,
                color: colors.textPrimary,
              }}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-bold text-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
            style={{
              backgroundColor: colors.buttonBackground,
              color: colors.buttonText,
              "--hover-bg": "#2bbf62", // A slightly darker green for hover
              "--hover-text": colors.buttonText,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = "var(--hover-bg)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = colors.buttonBackground;
              }
            }}
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Redirecting...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagerLoginPage;
