// pages/supplier/leaderboard.jsx (for Pages Router)
// or app/supplier/leaderboard/page.jsx (for App Router)

"use client"; // Required for App Router to enable client-side interactivity

import React, { useState, useMemo } from 'react'; // Import useState and useMemo
import { useRouter } from 'next/navigation'; // For navigation

// Import fonts using next/font
import { Manrope, Noto_Sans } from 'next/font/google';

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

const LeaderboardPage = () => {
  const router = useRouter();

  // Define the colors based on your HTML
  const colors = {
    backgroundPrimary: '#f8fbfa',
    backgroundSecondary: '#e8f2ec',
    textPrimary: '#0e1a13',
    textSecondary: '#51946b',
    borderColor: '#d1e6d9',
  };

  // --- State for filters ---
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Current'); // Default to 'Current'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  // --- More detailed Dummy data for Indian warehouse names and their scores/trends ---
  // Each supplier now has scores for different periods.
  const rawLeaderboardData = useMemo(() => ([
    { id: 'mumbai', name: 'Mumbai Logistics Hub', scores: { Current: 95, 'Last Month': 93, 'Last Quarter': 90, 'Last Year': 85 } },
    { id: 'delhi', name: 'Delhi Distribution Centre', scores: { Current: 92, 'Last Month': 94, 'Last Quarter': 91, 'Last Year': 88 } },
    { id: 'bangalore', name: 'Bangalore EcoWarehouse', scores: { Current: 90, 'Last Month': 88, 'Last Quarter': 92, 'Last Year': 95 } },
    { id: 'chennai', name: 'Chennai Green Storage', scores: { Current: 88, 'Last Month': 90, 'Last Quarter': 87, 'Last Year': 80 } },
    { id: 'kolkata', name: 'Kolkata Fulfillment', scores: { Current: 85, 'Last Month': 86, 'Last Quarter': 84, 'Last Year': 78 } },
    { id: 'hyderabad', name: 'Hyderabad Smart Depot', scores: { Current: 82, 'Last Month': 80, 'Last Quarter': 83, 'Last Year': 81 } },
    { id: 'ahmedabad', name: 'Ahmedabad Sustainable Hub', scores: { Current: 80, 'Last Month': 82, 'Last Quarter': 79, 'Last Year': 75 } },
    { id: 'pune', name: 'Pune Eco-Logistics', scores: { Current: 78, 'Last Month': 75, 'Last Quarter': 77, 'Last Year': 70 } },
    { id: 'jaipur', name: 'Jaipur CarbonLite', scores: { Current: 75, 'Last Month': 78, 'Last Quarter': 70, 'Last Year': 65 } },
    { id: 'lucknow', name: 'Lucknow Green Goods', scores: { Current: 72, 'Last Month': 70, 'Last Quarter': 73, 'Last Year': 71 } },
    { id: 'kochi', name: 'Kochi Port Warehouse', scores: { Current: 70, 'Last Month': 68, 'Last Quarter': 65, 'Last Year': 60 } },
    { id: 'indore', name: 'Indore Bio-Ware', scores: { Current: 68, 'Last Month': 72, 'Last Quarter': 69, 'Last Year': 62 } },
  ]), []);

  // --- Logic to sort and rank the data based on selected time period ---
  const sortedLeaderboardData = useMemo(() => {
    // Create a copy to avoid mutating original data
    const dataToSort = [...rawLeaderboardData];

    // Sort by the score of the selected time period in descending order
    dataToSort.sort((a, b) => {
      const scoreA = a.scores[selectedTimePeriod] || 0; // Default to 0 if score is missing
      const scoreB = b.scores[selectedTimePeriod] || 0;
      return scoreB - scoreA;
    });

    // Add ranks and determine trend based on 'Current' vs 'Last Month' (as an example)
    return dataToSort.map((supplier, index) => {
      const currentScore = supplier.scores['Current'];
      const lastMonthScore = supplier.scores['Last Month'];
      let trend = '→'; // No change
      if (currentScore > lastMonthScore) {
        trend = '↑'; // Upward trend
      } else if (currentScore < lastMonthScore) {
        trend = '↓'; // Downward trend
      }

      return {
        ...supplier,
        rank: index + 1, // Assign new rank after sorting
        displayScore: supplier.scores[selectedTimePeriod], // Score to display
        trend: trend, // Current vs Last Month trend
      };
    });
  }, [rawLeaderboardData, selectedTimePeriod]); // Re-run when raw data or selected period changes

  // --- Handlers for dropdown ---
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTimePeriodSelect = (period) => {
    setSelectedTimePeriod(period);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Function to navigate back to the report page or dashboard
  const navigateToReport = () => {
    router.push('/supplier/report'); // Or '/dashboard' if you prefer
  };

  const timePeriodOptions = ['Current', 'Last Month', 'Last Quarter', 'Last Year'];

  return (
    <div
      className={`relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden ${manrope.variable} ${notoSans.variable}`}
      style={{
        backgroundColor: colors.backgroundPrimary,
        fontFamily: 'var(--font-manrope), var(--font-noto-sans), sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e8f2ec] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0e1a13]">
            <div className="size-4">
              {/* Logo SVG */}
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
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

        {/* Main Content Area */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumbs / Back button */}
            <div className="flex flex-wrap gap-2 p-4">
              <a
                className="text-base font-medium leading-normal cursor-pointer"
                style={{ color: colors.textSecondary }}
                onClick={navigateToReport} // Use onClick for navigation
              >
                Back to Report Page
              </a>
              <span className="text-base font-medium leading-normal" style={{ color: colors.textSecondary }}>/</span>
              <span className="text-base font-medium leading-normal" style={{ color: colors.textPrimary }}>Leaderboard</span>
            </div>

            {/* Title Section */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#0e1a13] tracking-light text-[32px] font-bold leading-tight">Supplier Rankings</p>
                <p className="text-[#51946b] text-sm font-normal leading-normal">Track and compare supplier performance across sustainability metrics.</p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {/* Time Period Dropdown */}
              <div className="relative">
                <button
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e8f2ec] pl-4 pr-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <p className="text-[#0e1a13] text-sm font-medium leading-normal">{selectedTimePeriod}</p>
                  <div className="text-[#0e1a13]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {timePeriodOptions.map((period) => (
                        <a
                          key={period}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent page reload
                            handleTimePeriodSelect(period);
                          }}
                        >
                          {period}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Category Button (static for now) */}
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e8f2ec] pl-4 pr-2">
                <p className="text-[#0e1a13] text-sm font-medium leading-normal">Category</p>
                <div className="text-[#0e1a13]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </button>
              {/* Product Type Button (static for now) */}
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e8f2ec] pl-4 pr-2">
                <p className="text-[#0e1a13] text-sm font-medium leading-normal">Product Type</p>
                <div className="text-[#0e1a13]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </button>
            </div>

            {/* Leaderboard Table */}
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#d1e6d9] bg-[#f8fbfa]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#f8fbfa]">
                      <th className="table-867d7182-fc0d-4b27-9025-909706c7cf79-column-120 px-4 py-3 text-left text-[#0e1a13] w-[100px] text-sm font-medium leading-normal">Rank</th>
                      <th className="table-867d7182-fc0d-4b27-9025-909706c7cf79-column-240 px-4 py-3 text-left text-[#0e1a13] w-[250px] text-sm font-medium leading-normal">
                        Supplier
                      </th>
                      <th className="table-867d7182-fc0d-4b27-9025-909706c7cf79-column-360 px-4 py-3 text-left text-[#0e1a13] w-[150px] text-sm font-medium leading-normal">Score ({selectedTimePeriod})</th> {/* Dynamic header */}
                      <th className="table-867d7182-fc0d-4b27-9025-909706c7cf79-column-480 px-4 py-3 text-left text-[#0e1a13] w-[100px] text-sm font-medium leading-normal">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedLeaderboardData.map((supplier) => (
                      <tr key={supplier.id} className="border-t border-t-[#d1e6d9]"> {/* Use unique ID for key */}
                        <td className="table-867d7182-fc0d-4b27-9025-909706c7cf79-column-120 h-[72px] px-4 py-2 w-[100px] text-[#0e1a13] text-sm font-normal leading-normal">{supplier.rank}</td>
                        <td className="table-867d7182-fc0d-4b27-9025-909706c7cf79-column-240 h-[72px] px-4 py-2 w-[250px] text-[#0e1a13] text-sm font-normal leading-normal">
                          {supplier.name}
                        </td>
                        <td className={`table-867d7182-fc0d-4b27-9025-909706c7cf79-column-360 h-[72px] px-4 py-2 w-[150px] text-sm font-normal leading-normal ${supplier.displayScore >= 80 ? 'text-[#39e079]' : 'text-[#51946b]'}`}>{supplier.displayScore}</td>
                        <td className={`table-867d7182-fc0d-4b27-9025-909706c7cf79-column-480 h-[72px] px-4 py-2 w-[100px] text-sm font-normal leading-normal ${supplier.trend === '↑' ? 'text-[#39e079]' : supplier.trend === '↓' ? 'text-[#e03939]' : 'text-[#51946b]'}`}>{supplier.trend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <style jsx>{`
                @container (max-width: 120px) { .table-867d7182-fc0d-4b27-9025-909706c7cf79-column-120 { display: none; } }
                @container (max-width: 240px) { .table-867d7182-fc0d-4b27-9025-909706c7cf79-column-240 { display: none; } }
                @container (max-width: 360px) { .table-867d7182-fc0d-4b27-9025-909706c7cf79-column-360 { display: none; } }
                @container (max-width: 480px) { .table-867d7182-fc0d-4b27-9025-909706c7cf79-column-480 { display: none; } }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;