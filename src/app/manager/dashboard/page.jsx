// app/manager/dashboard/page.jsx (for App Router)
// or pages/manager/dashboard.jsx (for Pages Router)

"use client"; // Important for client-side interactivity in Next.js App Router

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation'; // For navigation

// Import Next.js Font Optimization
import { Manrope, Noto_Sans } from 'next/font/google';

// Load fonts
const manrope = Manrope({
  weight: ['400', '500', '700', '800'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoSans = Noto_Sans({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});

// Import your components
// Adjust paths based on your project structure (e.g., if components is sibling to app)
import IndiaMap from '../../components/IndiaMap';
import StoreDrawer from '../../components/StoreDrawer';

// Function to fetch store data (simulates an API call from a JSON file)
async function fetchWalmartStoresData() {
  try {
    const response = await import('../../walmartStores.json');
    return response.default;
  } catch (error) {
    console.error("Failed to load Walmart store data:", error);
    return [];
  }
}

const ManagerDashboardPage = () => {
  const router = useRouter();

  const [allStores, setAllStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Renamed from filterType to carbonPerformanceFilter to be more specific
  const [carbonPerformanceFilter, setCarbonPerformanceFilter] = useState('all');
  // New state for major factor checkboxes
  const [majorFactorFilters, setMajorFactorFilters] = useState({
    refrigeration: false,
    transportation: false,
    'waste-handling': false, // Use the exact string from JSON
    'energy-efficiency': false,
    lighting: false,
    water: false,
    HVAC: false,
    'employee-engagement': false,
    packaging: false,
    'food-waste': false
  });

  const colors = {
    backgroundPrimary: '#f8fbfa',
    backgroundSecondary: '#e8f2ec',
    textPrimary: '#0e1a13',
    textSecondary: '#51946b',
    borderColor: '#d1e6d9',
  };

  useEffect(() => {
    fetchWalmartStoresData().then(data => {
      setAllStores(data);
    });
  }, []);

  // Handler for major factor checkbox changes
  const handleMajorFactorChange = (event) => {
    const { name, checked } = event.target;
    setMajorFactorFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const filteredStores = useMemo(() => {
    let storesToFilter = [...allStores];

    // Apply carbon performance filter
    if (carbonPerformanceFilter === 'best') {
      storesToFilter = storesToFilter.sort((a, b) => a.performance.carbonFootprint.current - b.performance.carbonFootprint.current).slice(0, 5);
    } else if (carbonPerformanceFilter === 'worst') {
      storesToFilter = storesToFilter.sort((a, b) => b.performance.carbonFootprint.current - a.performance.carbonFootprint.current).slice(0, 5);
    } else if (carbonPerformanceFilter === 'lessThan100') {
      storesToFilter = storesToFilter.filter(store => store.performance.carbonFootprint.current < 100);
    } else if (carbonPerformanceFilter === '100to120') {
      storesToFilter = storesToFilter.filter(store => store.performance.carbonFootprint.current >= 100 && store.performance.carbonFootprint.current <= 120);
    } else if (carbonPerformanceFilter === 'greaterThan120') {
      storesToFilter = storesToFilter.filter(store => store.performance.carbonFootprint.current > 120);
    }

    // Apply major factor checkbox filters
    const activeMajorFactorFilters = Object.keys(majorFactorFilters).filter(key => majorFactorFilters[key]);

    if (activeMajorFactorFilters.length > 0) {
      storesToFilter = storesToFilter.filter(store =>
        activeMajorFactorFilters.every(factor =>
          store.majorFactors && store.majorFactors.includes(factor)
        )
      );
    }

    return storesToFilter;
  }, [allStores, carbonPerformanceFilter, majorFactorFilters]);


  const handleStoreClick = (store) => {
    setSelectedStore(store);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedStore(null);
  };

  return (
    <div
      className={`relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden ${manrope.variable} ${notoSans.variable}`}
      style={{
        backgroundColor: colors.backgroundPrimary,
        fontFamily: 'var(--font-manrope), var(--font-noto-sans), sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header section */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e8f2ec] px-10 py-3">
          <div className="flex items-center gap-4" style={{ color: colors.textPrimary }}>
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.6550 40.8547 21.8570 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.3580 21.6262 39.4750C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.7620C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.4750 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.6590 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.6590 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.9880 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#0e1a13] text-lg font-bold leading-tight tracking-[-0.015em]">EcoChain</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#0e1a13] text-sm font-medium leading-normal" href="/dashboard">Dashboard</a>
              <a className="text-[#0e1a13] text-sm font-medium leading-normal" href="/supplier/report">Reports</a>
              <a className="text-[#0e1a13] text-sm font-medium leading-normal" href="#">Insights</a>
              <a className="text-[#0e1a13] text-sm font-medium leading-normal" href="#">Support</a>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4GYcw8eV8TxRyDLdO2ssnFRQcYEEYcEs3r8RXH3aosAU7AKpnwu597V4hoAbKDZhH3KGyRfMfcQKAVJYsiG_2im2-E0kZ4mcd1nduXR8qjFrum9Q75gqnQiRs96ESQEZm53PjkxCO7-lWaVgAwZfh5cGgKLw3SvH7plRqz5Yxj0mlzAm43fbra2mOOtnfUZZmekw5xbt9xPVvYJqjpznAb3sqo1aIbn-ydbd-MQwuASL-n5fXKHLJ0ii7Gr2b96hix0h1swiAB6Au")' }}
            ></div>
          </div>
        </header>

        {/* Main Content Area - dynamically adjusts padding for side drawer */}
        <div className={`px-10 flex flex-1 flex-col py-5 transition-all duration-300 ease-in-out ${isDrawerOpen ? 'pr-96' : ''}`}>
          {/* Breadcrumbs / Navigation */}
          <div className="flex flex-wrap gap-2 p-4">
            <a
              className="text-base font-medium leading-normal cursor-pointer"
              style={{ color: colors.textSecondary }}
              onClick={() => router.push('/dashboard')}
            >
              Home
            </a>
            <span className="text-base font-medium leading-normal" style={{ color: colors.textSecondary }}>/</span>
            <span className="text-base font-medium leading-normal" style={{ color: colors.textPrimary }}>Store Performance Map</span>
          </div>

          {/* Title and Description */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-[#0e1a13] tracking-light text-[32px] font-bold leading-tight">Walmart Store Carbon Performance in India</p>
              <p className="text-[#51946b] text-sm font-normal leading-normal">Visualize and manage carbon emissions across all Walmart stores in India. Click on a store to view its detailed sustainability report and improvement suggestions.</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 p-3 flex-wrap items-center">
            {/* Carbon Performance Filters */}
            <button
              onClick={() => setCarbonPerformanceFilter('all')}
              className={`flex h-10 shrink-0 items-center justify-center rounded-lg px-4 text-sm font-medium leading-normal transition-colors duration-200 ${
                carbonPerformanceFilter === 'all' ? 'bg-[#51946b] text-white' : 'bg-[#e8f2ec] text-[#0e1a13] hover:bg-[#d1e6d9]'
              }`}
            >
              Show All Stores
            </button>
            <button
              onClick={() => setCarbonPerformanceFilter('best')}
              className={`flex h-10 shrink-0 items-center justify-center rounded-lg px-4 text-sm font-medium leading-normal transition-colors duration-200 ${
                carbonPerformanceFilter === 'best' ? 'bg-green-600 text-white' : 'bg-[#e8f2ec] text-[#0e1a13] hover:bg-[#d1e6d9]'
              }`}
            >
              Top 5 Best (Carbon)
            </button>
            <button
              onClick={() => setCarbonPerformanceFilter('worst')}
              className={`flex h-10 shrink-0 items-center justify-center rounded-lg px-4 text-sm font-medium leading-normal transition-colors duration-200 ${
                carbonPerformanceFilter === 'worst' ? 'bg-red-600 text-white' : 'bg-[#e8f2ec] text-[#0e1a13] hover:bg-[#d1e6d9]'
              }`}
            >
              Top 5 Worst (Carbon)
            </button>
            <button
              onClick={() => setCarbonPerformanceFilter('lessThan100')}
              className={`flex h-10 shrink-0 items-center justify-center rounded-lg px-4 text-sm font-medium leading-normal transition-colors duration-200 ${
                carbonPerformanceFilter === 'lessThan100' ? 'bg-blue-600 text-white' : 'bg-[#e8f2ec] text-[#0e1a13] hover:bg-[#d1e6d9]'
              }`}
            >
              Carbon &lt; 100 tonnes
            </button>
            <button
              onClick={() => setCarbonPerformanceFilter('100to120')}
              className={`flex h-10 shrink-0 items-center justify-center rounded-lg px-4 text-sm font-medium leading-normal transition-colors duration-200 ${
                carbonPerformanceFilter === '100to120' ? 'bg-yellow-600 text-white' : 'bg-[#e8f2ec] text-[#0e1a13] hover:bg-[#d1e6d9]'
              }`}
            >
              Carbon 100-120 tonnes
            </button>
            <button
              onClick={() => setCarbonPerformanceFilter('greaterThan120')}
              className={`flex h-10 shrink-0 items-center justify-center rounded-lg px-4 text-sm font-medium leading-normal transition-colors duration-200 ${
                carbonPerformanceFilter === 'greaterThan120' ? 'bg-purple-600 text-white' : 'bg-[#e8f2ec] text-[#0e1a13] hover:bg-[#d1e6d9]'
              }`}
            >
              Carbon &gt; 120 tonnes
            </button>
          </div>

          {/* Major Factor Checkboxes */}
          <div className="flex gap-4 p-3 flex-wrap items-center bg-[#e8f2ec] rounded-lg mt-3">
            <span className="text-[#0e1a13] text-sm font-medium leading-normal">Focus Areas:</span>
            {Object.keys(majorFactorFilters).map((factor) => (
              <div key={factor} className="flex items-center">
                <input
                  type="checkbox"
                  id={factor}
                  name={factor}
                  checked={majorFactorFilters[factor]}
                  onChange={handleMajorFactorChange}
                  className="h-4 w-4 text-[#51946b] focus:ring-[#51946b] border-gray-300 rounded"
                />
                <label htmlFor={factor} className="ml-2 text-sm text-[#0e1a13] capitalize">
                  {factor.replace(/-/g, ' ')}
                </label>
              </div>
            ))}
          </div>


          {/* Map Area */}
          <div className="flex-1 p-4 min-h-[400px]">
            {allStores.length > 0 ? (
              <IndiaMap stores={filteredStores} onStoreClick={handleStoreClick} filterType={carbonPerformanceFilter} />
            ) : (
              <div className="flex justify-center items-center h-full text-lg text-gray-500">
                Loading map data...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side Drawer Component */}
      <StoreDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose} store={selectedStore} />
    </div>
  );
};

export default ManagerDashboardPage;