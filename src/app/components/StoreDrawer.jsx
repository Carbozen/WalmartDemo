const StoreDrawer = ({ isOpen, onClose, store }) => {
  // If drawer is not open or no store is selected, render nothing
  if (!isOpen || !store) return null;

  // Function to determine color based on carbon footprint for display
  const getCarbonPerformanceColorClass = (current, target) => {
    // Assuming lower carbon footprint is better, compared to target
    if (current <= target) {
      return "text-green-600"; // Meeting or exceeding target (good)
    } else if (current <= target * 1.1) {
      // 10% over target
      return "text-orange-500"; // Slightly above target (needs attention)
    }
    return "text-red-600"; // Significantly above target (poor)
  };

  const getWastePerformanceColorClass = (current, target) => {
    // Assuming higher waste diversion is better, compared to target
    if (current >= target) {
      return "text-green-600"; // Meeting or exceeding target (good)
    } else if (current >= target * 0.9) {
      // 10% below target
      return "text-orange-500"; // Slightly below target (needs attention)
    }
    return "text-red-600"; // Significantly below target (poor)
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50 overflow-y-auto p-6 border-l border-gray-200`}
      style={{
        backgroundColor: "#f8fbfa",
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        ×
      </button>

      <h2 className="text-3xl font-bold mb-4 text-[#0e1a13]">{store.name}</h2>
      <p className="text-gray-700 mb-6 text-sm">📍 {store.address}</p>

      {/* Carbon Performance Section */}
      <div className="bg-[#e8f2ec] rounded-lg p-4 mb-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-2 text-[#0e1a13]">
          Carbon Footprint
        </h3>
        <p className="text-lg mb-1">
          Current:{" "}
          <span
            className={`${getCarbonPerformanceColorClass(
              store.performance.carbonFootprint.current,
              store.performance.carbonFootprint.target
            )} font-bold`}
          >
            {store.performance.carbonFootprint.current}{" "}
            {store.performance.carbonFootprint.unit}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          Target: {store.performance.carbonFootprint.target}{" "}
          {store.performance.carbonFootprint.unit}
        </p>
        <p className="text-sm text-gray-600">
          Last Period: {store.performance.carbonFootprint.lastPeriod}{" "}
          {store.performance.carbonFootprint.unit}
        </p>
      </div>

      {/* Other Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#e8f2ec] rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-[#0e1a13]">
            Energy Consumption
          </h3>
          <p className="text-lg">
            {store.performance.energyConsumption.current}{" "}
            {store.performance.energyConsumption.unit}
          </p>
        </div>
        <div className="bg-[#e8f2ec] rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-[#0e1a13]">
            Waste Diversion
          </h3>
          <p className="text-lg">
            <span
              className={`${getWastePerformanceColorClass(
                store.performance.wasteDiversion.current,
                store.performance.wasteDiversion.target
              )} font-bold`}
            >
              {(store.performance.wasteDiversion.current * 100).toFixed(1)}%
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Target: {(store.performance.wasteDiversion.target * 100).toFixed(1)}
            %
          </p>
        </div>
      </div>

      {/* Major Factors Section */}
      {store.majorFactors && store.majorFactors.length > 0 && (
        <div className="bg-[#e8f2ec] rounded-lg p-4 mb-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-[#0e1a13]">
            Key Areas of Impact:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {store.majorFactors.map((factor, index) => (
              <li key={index} className="capitalize">
                {/* Improve readability of factor names */}
                {factor
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Problems Faced Section */}
      {store.issues && store.issues.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-red-700">
            🚨 Problems Faced:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {store.issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions for Improvement Section */}
      {store.suggestions && store.suggestions.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-green-700">
            💡 Suggestions for Improvement:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {store.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-4 text-center">
        Data updated periodically for performance tracking.
      </p>
    </div>
  );
};

export default StoreDrawer;
