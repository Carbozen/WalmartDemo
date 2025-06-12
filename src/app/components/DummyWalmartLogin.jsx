// components/DummyWalmartLogin.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // <--- CHANGE THIS IMPORT// Import useRouter for page routing

const DummyWalmartLogin = () => {
  const router = useRouter(); // Initialize the router

  const [formData, setFormData] = useState({
    storeIdentifier: '',
    sharedStorePassword: '',
    authenticationKey: '',
    registeredStorePhone: '',
    storeGstin: '',
    location: '',
    captcha: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate an API call or processing delay
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      console.log('Dummy form submission successful:', formData);

      // --- REDIRECTION LOGIC HERE ---
      // This is where the redirect happens after the dummy login
      router.push('/supplier/dashboard'); // Redirect to the /dashboard route
      // You can also use replace() if you don't want to add to browser history:
      // router.replace('/dashboard');
      // -----------------------------

    }, 1500); // Simulate 1.5 seconds of "processing"
  };

  // Color Codes (from previous extraction)
  const colors = {
    backgroundPrimary: '#f8fbfa', // Off-white / Light Gray
    backgroundSecondary: '#e8f2ec', // Very Light Green / Mint Cream
    textPrimary: '#0e1a13', // Dark Green / Very Dark Desaturated Green
    textSecondary: '#51946b', // Medium Green / Desaturated Green
    positiveIndicator: '#078829', // Dark Green / Forest Green
    negativeIndicator: '#e72a08', // Bright Red / Orange-Red
    borderColor: '#d1e6d9', // Light Grayish Green / Pale Green
  };

  // Example list of Flipkart Wholesale (Best Price) locations in India
  const flipkartWholesaleLocations = [
    'Amritsar, Punjab',
    'Bhopal, Madhya Pradesh',
    'Guntur, Andhra Pradesh',
    'Hyderabad, Telangana',
    'Jaipur, Rajasthan',
    'Jalandhar, Punjab',
    'Jammu, Jammu & Kashmir',
    'Kashipur, Uttarakhand',
    'Kota, Rajasthan',
    'Kozhikode, Kerala',
    'Lucknow, Uttar Pradesh',
    'Ludhiana, Punjab',
    'Nagpur, Maharashtra',
    'Patna, Bihar', // Relevant for current context (near Bhadeja)
    'Raipur, Chhattisgarh',
    'Surat, Gujarat',
    'Varanasi, Uttar Pradesh',
    'Vijayawada, Andhra Pradesh',
    // Add more if you have specific knowledge of all 28 locations
  ];

  return (
    <div
      className="relative flex size-full min-h-screen flex-col items-center justify-center py-10"
      style={{ backgroundColor: colors.backgroundPrimary }}
    >
      <div
        className="w-full max-w-md p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: colors.backgroundSecondary, borderColor: colors.borderColor, borderWidth: '1px' }}
      >
        <h1
          className="text-center text-3xl font-bold mb-6"
          style={{ color: colors.textPrimary }}
        >
          Walmart Wholesale Store Access
        </h1>
        <p
          className="text-center text-sm mb-8"
          style={{ color: colors.textSecondary }}
        >
          Please enter your store's details to proceed.
        </p>

        {formSubmitted ? (
          // This block will be very brief as it immediately redirects
          <div className="text-center">
            <svg
              className="mx-auto h-16 w-16 animate-pulse" // Added pulse for visual effect before redirect
              style={{ color: colors.positiveIndicator }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xl font-medium mt-4" style={{ color: colors.positiveIndicator }}>
              Redirecting...
            </p>
            <p className="text-sm mt-2" style={{ color: colors.textPrimary }}>
              Access Granted! Taking you to the dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="storeIdentifier"
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Store Identifier (Walmart Supplier # / GLN / Internal Code)
              </label>
              <input
                type="text"
                id="storeIdentifier"
                name="storeIdentifier"
                value={formData.storeIdentifier}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.backgroundPrimary,
                  color: colors.textPrimary,
                  borderColor: colors.borderColor,
                  borderWidth: '1px',
                  '--focus-ring-color': colors.textSecondary,
                }}
                onFocus={(e) => (e.currentTarget.style.outlineColor = 'var(--focus-ring-color)')}
                onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                placeholder="e.g., 123456, 890...GLN, BP-01"
                required
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Store Location
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 appearance-none"
                style={{
                  backgroundColor: colors.backgroundPrimary,
                  color: colors.textPrimary,
                  borderColor: colors.borderColor,
                  borderWidth: '1px',
                  '--focus-ring-color': colors.textSecondary,
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='${encodeURIComponent(colors.textPrimary)}'%3e%3cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3e%3c/path%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
                onFocus={(e) => (e.currentTarget.style.outlineColor = 'var(--focus-ring-color)')}
                onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                required
              >
                <option value="" disabled>Select a location</option>
                {flipkartWholesaleLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sharedStorePassword"
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Store Password
              </label>
              <input
                type="password"
                id="sharedStorePassword"
                name="sharedStorePassword"
                value={formData.sharedStorePassword}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.backgroundPrimary,
                  color: colors.textPrimary,
                  borderColor: colors.borderColor,
                  borderWidth: '1px',
                  '--focus-ring-color': colors.textSecondary,
                }}
                onFocus={(e) => (e.currentTarget.style.outlineColor = 'var(--focus-ring-color)')}
                onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                placeholder="Enter shared store password"
                required
              />
            </div>

            <div>
              <label
                htmlFor="authenticationKey"
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Authentication Key / OTP (Optional)
              </label>
              <input
                type="text"
                id="authenticationKey"
                name="authenticationKey"
                value={formData.authenticationKey}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.backgroundPrimary,
                  color: colors.textPrimary,
                  borderColor: colors.borderColor,
                  borderWidth: '1px',
                  '--focus-ring-color': colors.textSecondary,
                }}
                onFocus={(e) => (e.currentTarget.style.outlineColor = 'var(--focus-ring-color)')}
                onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                placeholder="e.g., 123456 (if applicable)"
              />
            </div>

            <div>
              <label
                htmlFor="registeredStorePhone"
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Registered Store Phone Number
              </label>
              <input
                type="tel"
                id="registeredStorePhone"
                name="registeredStorePhone"
                value={formData.registeredStorePhone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.backgroundPrimary,
                  color: colors.textPrimary,
                  borderColor: colors.borderColor,
                  borderWidth: '1px',
                  '--focus-ring-color': colors.textSecondary,
                }}
                onFocus={(e) => (e.currentTarget.style.outlineColor = 'var(--focus-ring-color)')}
                onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                placeholder="e.g., +91 9876543210"
              />
            </div>

            <div>
              <label
                htmlFor="storeGstin"
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Store GSTIN (Optional)
              </label>
              <input
                type="text"
                id="storeGstin"
                name="storeGstin"
                value={formData.storeGstin}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.backgroundPrimary,
                  color: colors.textPrimary,
                  borderColor: colors.borderColor,
                  borderWidth: '1px',
                  '--focus-ring-color': colors.textSecondary,
                }}
                onFocus={(e) => (e.currentTarget.style.outlineColor = 'var(--focus-ring-color)')}
                onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                placeholder="e.g., 27ABCDE1234F1Z5"
              />
            </div>

            {/* Dummy Captcha / reCAPTCHA */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="captcha"
                name="captcha"
                checked={true}
                readOnly
                className="h-4 w-4 rounded"
                style={{ accentColor: colors.textSecondary }}
              />
              <label htmlFor="captcha" className="text-sm" style={{ color: colors.textPrimary }}>
                I'm not a robot (simulated reCAPTCHA)
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-lg transition duration-300 flex items-center justify-center"
              style={{
                backgroundColor: colors.textPrimary,
                color: colors.backgroundSecondary,
                '--hover-bg': colors.textSecondary,
                '--hover-text': colors.backgroundPrimary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                e.currentTarget.style.color = 'var(--hover-text)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.textPrimary;
                e.currentTarget.style.color = colors.backgroundSecondary;
              }}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  style={{ color: colors.backgroundSecondary }}
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
              ) : (
                'Sign In / Gain Access'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DummyWalmartLogin;
