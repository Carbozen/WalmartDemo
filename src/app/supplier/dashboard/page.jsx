// pages/dashboard.jsx or app/dashboard/page.jsx

"use client"; // Keep this if using App Router

import React, { useState } from 'react'; // Added useState for potential future interactivity
import { useRouter } from 'next/navigation'; // For redirection

const DashboardPage = () => {
  const router = useRouter();

  // Define the colors from the provided HTML/previous context
  const colors = {
    backgroundPrimary: '#f8fbfa', // Off-white / Light Gray
    backgroundSecondary: '#e8f2ec', // Very Light Green / Mint Cream
    textPrimary: '#0e1a13', // Dark Green / Very Dark Desaturated Green
    textSecondary: '#51946b', // Medium Green / Desaturated Green
    positiveIndicator: '#078829', // Dark Green / Forest Green
    negativeIndicator: '#e72a08', // Bright Red / Orange-Red
    borderColor: '#d1e6d9', // Light Grayish Green / Pale Green
  };

  // Dummy data for the dashboard (only for graphs as requested)
  const dummyGraphData = {
    carbonChartData: [
      { month: 'Jan', height: '100%' },
      { month: 'Feb', height: '80%' },
      { month: 'Mar', height: '30%' },
      { month: 'Apr', height: '40%' },
      { month: 'May', height: '90%' },
      { month: 'Jun', height: '60%' },
      { month: 'Jul', height: '50%' },
    ],
    initiatives: [
      { name: 'Initiative A', progress: 70 },
      { name: 'Initiative B', progress: 30 },
      { name: 'Initiative C', progress: 20 },
      { name: 'Initiative D', progress: 70 },
      { name: 'Initiative E', progress: 70 },
    ],
  };

  // State to manage active navigation tab (for styling)
  const [activeTab, setActiveTab] = useState('Home');

  const handleNavigationClick = (path, tabName) => {
    setActiveTab(tabName);
    router.push(path);
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden"
      style={{ backgroundColor: colors.backgroundPrimary, fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar */}
          <div className="layout-content-container flex flex-col w-80">
            <div
              className="flex h-full min-h-[700px] flex-col justify-between p-4"
              style={{ backgroundColor: colors.backgroundPrimary }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h1 className="text-base font-medium leading-normal" style={{ color: colors.textPrimary }}>
                    Sustainable Supply Chain
                  </h1>
                  <p className="text-sm font-normal leading-normal" style={{ color: colors.textSecondary }}>
                    Supplier Portal
                  </p>
                </div>
                {/* Navigation Items */}
                <div className="flex flex-col gap-2">
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                      activeTab === 'Home' ? 'bg-[#e8f2ec]' : ''
                    }`}
                    onClick={() => handleNavigationClick('/dashboard', 'Home')}
                    style={{ backgroundColor: activeTab === 'Home' ? colors.backgroundSecondary : 'transparent' }}
                  >
                    <div style={{ color: colors.textPrimary }}>
                      {/* Home Icon SVG */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-medium leading-normal" style={{ color: colors.textPrimary }}>Home</p>
                  </div>

                  <div
                    className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${
                      activeTab === 'Report' ? 'bg-[#e8f2ec]' : ''
                    }`}
                    onClick={() => handleNavigationClick('/supplier/report', 'Report')}
                    style={{ backgroundColor: activeTab === 'Report' ? colors.backgroundSecondary : 'transparent' }}
                  >
                    <div style={{ color: colors.textPrimary }}>
                      {/* New Report Icon SVG (using Document icon as a placeholder) */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,88v120a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H168Z" opacity="0.2"></path>
                        <path d="M168,24H48A24,24,0,0,0,24,48V208a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V88ZM168,40v48h48ZM208,216H48V40h104V88a16,16,0,0,0,16,16h48V208Z"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-medium leading-normal" style={{ color: colors.textPrimary }}>Report</p>
                  </div>

                  {/* Other navigation items can be added here, currently just placeholders */}
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div style={{ color: colors.textPrimary }}>
                      {/* Performance Icon SVG (unchanged) */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-medium leading-normal" style={{ color: colors.textPrimary }}>Performance</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div style={{ color: colors.textPrimary }}>
                      {/* Insights Icon SVG (unchanged) */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-medium leading-normal" style={{ color: colors.textPrimary }}>Insights</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div style={{ color: colors.textPrimary }}>
                      {/* Support Icon SVG (unchanged) */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-medium leading-normal" style={{ color: colors.textPrimary }}>Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="tracking-light text-[32px] font-bold leading-tight min-w-72" style={{ color: colors.textPrimary }}>
                Welcome, to the Sustainable Supply Chain Dashboard
              </p>
            </div>

            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5" style={{ color: colors.textPrimary }}>
              Overall Health Score
            </h2>
            <div className="flex flex-wrap gap-4 p-4">
              <div
                className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6"
                style={{ backgroundColor: colors.backgroundSecondary }}
              >
                <p className="text-base font-medium leading-normal" style={{ color: colors.textPrimary }}>Health Score</p>
                <p className="tracking-light text-2xl font-bold leading-tight" style={{ color: colors.textPrimary }}>
                  85%
                </p>
                <p className="text-base font-medium leading-normal" style={{ color: colors.positiveIndicator }}>
                  +5% (from last month)
                </p>
              </div>
              
         
            </div>

            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5" style={{ color: colors.textPrimary }}>
              Performance Overview
            </h2>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              {/* Carbon Emissions Trend Card (Dummy Graph) */}
              <div
                className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg p-6"
                style={{ borderColor: colors.borderColor, borderWidth: '1px' }}
              >
                <p className="text-base font-medium leading-normal" style={{ color: colors.textPrimary }}>
                  Carbon Emissions Trend
                </p>
                <p className="tracking-light text-[32px] font-bold leading-tight truncate" style={{ color: colors.textPrimary }}>
                  -10% 
                </p>
                <div className="flex gap-1">
                  <p className="text-base font-normal leading-normal" style={{ color: colors.textSecondary }}>Last 12 Months</p>
                  <p className="text-base font-medium leading-normal" style={{ color: colors.negativeIndicator }}>
                    -5% 
                  </p>
                </div>
                <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
                  {dummyGraphData.carbonChartData.map((data, index) => (
                    <React.Fragment key={index}>
                      <div
                        className="border-t-2 w-full"
                        style={{ height: data.height, borderColor: colors.textSecondary, backgroundColor: colors.backgroundSecondary }}
                      ></div>
                      <p className="text-[13px] font-bold leading-normal tracking-[0.015em]" style={{ color: colors.textSecondary }}>
                        {data.month}
                      </p>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Sustainability Initiatives Progress Card (Dummy Graph) */}
              <div
                className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg p-6"
                style={{ borderColor: colors.borderColor, borderWidth: '1px' }}
              >
                <p className="text-base font-medium leading-normal" style={{ color: colors.textPrimary }}>
                  Sustainability Initiatives Progress
                </p>
                <p className="tracking-light text-[32px] font-bold leading-tight truncate" style={{ color: colors.textPrimary }}>
                  75% 
                </p>
                <div className="flex gap-1">
                  <p className="text-base font-normal leading-normal" style={{ color: colors.textSecondary }}>Current Quarter</p>
                  <p className="text-base font-medium leading-normal" style={{ color: colors.positiveIndicator }}>
                    +15% 
                
                  </p>
                </div>
                <div className="grid min-h-[180px] gap-x-4 gap-y-6 grid-cols-[auto_1fr] items-center py-3">
                  {dummyGraphData.initiatives.map((initiative, index) => (
                    <React.Fragment key={index}>
                      <p className="text-[13px] font-bold leading-normal tracking-[0.015em]" style={{ color: colors.textSecondary }}>
                        {initiative.name}
                      </p>
                      <div className="h-full flex-1">
                        <div
                          className="border-r-2 h-full"
                          style={{
                            width: `${initiative.progress}%`,
                            borderColor: colors.textSecondary,
                            backgroundColor: colors.backgroundSecondary,
                          }}
                        ></div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a className="text-base font-normal leading-normal min-w-40" href="#" style={{ color: colors.textSecondary }}>
                  Terms of Service
                </a>
                <a className="text-base font-normal leading-normal min-w-40" href="#" style={{ color: colors.textSecondary }}>
                  Privacy Policy
                </a>
                <a className="text-base font-normal leading-normal min-w-40" href="#" style={{ color: colors.textSecondary }}>
                  Contact Us
                </a>
              </div>
              <p className="text-base font-normal leading-normal" style={{ color: colors.textSecondary }}>
                @2024 Sustainable Supply Chain Platform. All rights reserved.
              </p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardPage;