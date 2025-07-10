// pages/supplier/report.jsx (for Pages Router)
// or app/supplier/report/page.jsx (for App Router)

"use client"; // Required for App Router to enable client-side interactivity

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation

const ReportPage = () => {
  const router = useRouter();

  // Define the colors
  const colors = {
    backgroundPrimary: "#f8fbfa",
    backgroundSecondary: "#e8f2ec",
    textPrimary: "#0e1a13",
    textSecondary: "#51946b",
    borderColor: "#d1e6d9",
    buttonBackground: "#39e079",
    buttonText: "#0e1a13",
  };

  // State for form inputs
  const [reportData, setReportData] = useState({
    month: "",
    onsiteVehicleFuelConsumption: "",
    electricityWarehouse: "",
    refrigerantLeakage: "",
    materialHandlingEquipment: "",
    logisticsFleet: "",
    excelFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setReportData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Report Data Submitted (Check console for dummy data)");
    // You might also clear the form or navigate away after submission
  };

  // Handle navigation to leaderboard
  const navigateToLeaderboard = () => {
    router.push("/supplier/leaderboard");
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden"
      style={{
        "--select-button-svg": `url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(81,148,107)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')`,
        backgroundColor: colors.backgroundPrimary,
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e8f2ec] px-10 py-3">
          <div
            className="flex items-center gap-4"
            style={{ color: colors.textPrimary }}
          >
            <div className="size-4">
              {/* Logo SVG */}
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
            <h2
              className="text-lg font-bold leading-tight tracking-[-0.015em]"
              style={{ color: colors.textPrimary }}
            >
              EcoChain
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a
                className="text-sm font-medium leading-normal"
                href="/dashboard"
                style={{ color: colors.textPrimary }}
              >
                Dashboard
              </a>
              <a
                className="text-sm font-medium leading-normal"
                href="/supplier/report"
                style={{ color: colors.textPrimary }}
              >
                Reports
              </a>
              <a
                className="text-sm font-medium leading-normal"
                href="#"
                style={{ color: colors.textPrimary }}
              >
                Insights
              </a>
              <a
                className="text-sm font-medium leading-normal"
                href="#"
                style={{ color: colors.textPrimary }}
              >
                Support
              </a>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDu-l65MPvjXVAiQLsIctzOZ6BVBetiOefUr9WNZ4nM7LuSfV8tBlwbe445uYqPEcVELC7PoFSQAghzt3-pAwitGb2g2NkepvGHOp5YK5MaKQ75pZwZxQvQnWpr50jluqG_2ok4X8rA3J2w4Xjl51VABVboUdTI1B0B8dQHa4Ub2W1D9DJTUrS-AZFyRF0oPM_1yc1SXyUXDFUDkMMdMP1DGokco2rcbgkYIqyDyQIess-Rw7ByjncG8oGOflN-wY7W-GqQZBZYYfdb")',
              }}
            ></div>
          </div>
        </header>

        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar - Simplified */}
          <div className="layout-content-container flex flex-col w-80">
            <div
              className="flex h-full min-h-[700px] flex-col justify-between p-4"
              style={{ backgroundColor: colors.backgroundPrimary }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h1
                    className="text-base font-medium leading-normal"
                    style={{ color: colors.textPrimary }}
                  >
                    EcoChain
                  </h1>
                  <p
                    className="text-sm font-normal leading-normal"
                    style={{ color: colors.textSecondary }}
                  >
                    Supplier Portal
                  </p>
                </div>
                {/* Single Sidebar Item: Leaderboard */}
                <div className="flex flex-col gap-2">
                  <div
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg hover:bg-opacity-80 transition-colors"
                    onClick={navigateToLeaderboard}
                    style={{ backgroundColor: colors.backgroundSecondary }}
                  >
                    <div style={{ color: colors.textPrimary }}>
                      {/* Using a generic chart icon for Leaderboard */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                      </svg>
                    </div>
                    <p
                      className="text-sm font-medium leading-normal"
                      style={{ color: colors.textPrimary }}
                    >
                      Leaderboard
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area - Report Form */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 p-4">
              <a
                className="text-base font-medium leading-normal"
                href="/dashboard"
                style={{ color: colors.textSecondary }}
              >
                Home
              </a>
              <span
                className="text-base font-medium leading-normal"
                style={{ color: colors.textSecondary }}
              >
                /
              </span>
              <span
                className="text-base font-medium leading-normal"
                style={{ color: colors.textPrimary }}
              >
                Reports
              </span>
            </div>

            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p
                className="tracking-light text-[32px] font-bold leading-tight min-w-72"
                style={{ color: colors.textPrimary }}
              >
                Environmental Data Submission
              </p>
            </div>
            <p
              className="text-base font-normal leading-normal pb-3 pt-1 px-4"
              style={{ color: colors.textPrimary }}
            >
              Please provide the following data points for accurate CO2
              calculation and sustainability reporting. Ensure all fields are
              completed with precise information.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Reporting Period */}
              <h2
                className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
                style={{ color: colors.textPrimary }}
              >
                Reporting Period
              </h2>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p
                    className="text-base font-medium leading-normal pb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    Select Month
                  </p>
                  <select
                    name="month"
                    value={reportData.month}
                    onChange={handleInputChange}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border bg-(image:--select-button-svg) placeholder:text-[#51946b] p-[15px] text-base font-normal leading-normal"
                    style={{
                      color: colors.textPrimary,
                      borderColor: colors.borderColor,
                      backgroundColor: colors.backgroundPrimary,
                      "--select-button-svg": "var(--select-button-svg)",
                    }}
                  >
                    <option value="">Select Month</option>
                    <option value="Jan">January</option>
                    <option value="Feb">February</option>
                    <option value="Mar">March</option>
                    <option value="Apr">April</option>
                    <option value="May">May</option>
                    <option value="Jun">June</option>
                    <option value="Jul">July</option>
                    <option value="Aug">August</option>
                    <option value="Sep">September</option>
                    <option value="Oct">October</option>
                    <option value="Nov">November</option>
                    <option value="Dec">December</option>
                  </select>
                </label>
              </div>

              {/* Energy & Emissions Data */}
              <h2
                className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
                style={{ color: colors.textPrimary }}
              >
                Energy & Emissions Data
              </h2>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p
                    className="text-base font-medium leading-normal pb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    Onsite Veichle Fuel Consumption (kwh)
                  </p>
                  <input
                    type="number"
                    name="onsiteVehicleFuelConsumption"
                    value={reportData.onsiteVehicleFuelConsumption}
                    onChange={handleInputChange}
                    placeholder="Enter kwh"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border placeholder:text-[#51946b] p-[15px] text-base font-normal leading-normal"
                    style={{
                      color: colors.textPrimary,
                      borderColor: colors.borderColor,
                      backgroundColor: colors.backgroundPrimary,
                    }}
                  />
                </label>
              </div>

              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p
                    className="text-base font-medium leading-normal pb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    Electricity of WareHouse (kwh)
                  </p>
                  <input
                    type="number"
                    name="electricityWarehouse"
                    value={reportData.electricityWarehouse}
                    onChange={handleInputChange}
                    placeholder="Enter kwh"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border placeholder:text-[#51946b] p-[15px] text-base font-normal leading-normal"
                    style={{
                      color: colors.textPrimary,
                      borderColor: colors.borderColor,
                      backgroundColor: colors.backgroundPrimary,
                    }}
                  />
                </label>
              </div>

              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p
                    className="text-base font-medium leading-normal pb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    Refrigant Leakage (kg)
                  </p>
                  <input
                    type="number"
                    name="refrigerantLeakage"
                    value={reportData.refrigerantLeakage}
                    onChange={handleInputChange}
                    placeholder="Enter leakage in kg"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border placeholder:text-[#51946b] p-[15px] text-base font-normal leading-normal"
                    style={{
                      color: colors.textPrimary,
                      borderColor: colors.borderColor,
                      backgroundColor: colors.backgroundPrimary,
                    }}
                  />
                </label>
              </div>

              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p
                    className="text-base font-medium leading-normal pb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    Material Handling Equipment (kwh)
                  </p>
                  <input
                    type="number"
                    name="materialHandlingEquipment"
                    value={reportData.materialHandlingEquipment}
                    onChange={handleInputChange}
                    placeholder="Enter kwh"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border placeholder:text-[#51946b] p-[15px] text-base font-normal leading-normal"
                    style={{
                      color: colors.textPrimary,
                      borderColor: colors.borderColor,
                      backgroundColor: colors.backgroundPrimary,
                    }}
                  />
                </label>
              </div>

              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p
                    className="text-base font-medium leading-normal pb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    Logistics Fleet (kwh)
                  </p>
                  <input
                    type="number"
                    name="logisticsFleet"
                    value={reportData.logisticsFleet}
                    onChange={handleInputChange}
                    placeholder="Enter kwh"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border placeholder:text-[#51946b] p-[15px] text-base font-normal leading-normal"
                    style={{
                      color: colors.textPrimary,
                      borderColor: colors.borderColor,
                      backgroundColor: colors.backgroundPrimary,
                    }}
                  />
                </label>
              </div>

              {/* Excel Upload Section */}
              <h2
                className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
                style={{ color: colors.textPrimary }}
              >
                Product Sales Data Upload
              </h2>
              <p
                className="text-base font-normal leading-normal pb-3 pt-1 px-4"
                style={{ color: colors.textPrimary }}
              >
                Supply managers can upload an Excel sheet (.csv, .xls, .xlsx)
                containing all products sold for the week.
              </p>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p
                    className="text-base font-medium leading-normal pb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    Upload Products Sold Excel Sheet
                  </p>
                  <input
                    type="file"
                    name="excelFile"
                    accept=".csv, .xls, .xlsx"
                    onChange={handleInputChange}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border placeholder:text-[#51946b] p-[15px] text-base font-normal leading-normal file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold"
                    style={{
                      color: colors.textPrimary,
                      borderColor: colors.borderColor,
                      backgroundColor: colors.backgroundPrimary,
                    }}
                  />
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex px-4 py-3 justify-end">
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors duration-200"
                  style={{
                    backgroundColor: colors.buttonBackground,
                    color: colors.buttonText,
                    "--hover-bg": "#2bbf62",
                    "--hover-text": colors.buttonText,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--hover-bg)";
                    e.currentTarget.style.color = "var(--hover-text)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.buttonBackground;
                    e.currentTarget.style.color = colors.buttonText;
                  }}
                >
                  <span className="truncate">Submit All Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
