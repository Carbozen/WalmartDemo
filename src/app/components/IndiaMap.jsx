// components/IndiaMap.jsx
"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Essential for Leaflet styles

// Fix for default Leaflet icon not showing up in Webpack/Next.js
// This ensures that the marker images are correctly loaded.
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

// Override default icon to fix missing marker images
const DefaultIcon = L.icon({
    iconUrl: icon.src,
    iconRetinaUrl: iconRetina.src,
    shadowUrl: shadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
// End of Leaflet icon fix

const containerStyle = {
  width: '100%',
  height: '80vh', // Map takes up 80% of viewport height
  borderRadius: '0.5rem', // Rounded corners for the map
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
};

// **Improved Bounding Box for India:**
// Slightly wider bounds to ensure entire mainland India (including southernmost tip) is visible.
const INDIA_BOUNDS = L.latLngBounds(
  [7.0, 67.0],  // Southwest corner (increased southern padding, slightly wider west)
  [37.5, 98.0]  // Northeast corner (slightly increased northern padding, wider east)
);

// Approximate center of India for initial map view
const center = [22.3511147, 78.6677428];

const IndiaMap = ({ stores, onStoreClick, filterType }) => {
  const mapRef = useRef(null);

  // Adjust map view to fit all markers or reset to full India view
  useEffect(() => {
    if (mapRef.current) {
      const leafletMap = mapRef.current;

      if (stores.length > 0) {
        // Create bounds from current filtered stores
        const bounds = L.latLngBounds(stores.map(store => [store.location.lat, store.location.lng]));
        // Fit these bounds, ensuring not to zoom out beyond INDIA_BOUNDS and setting a max zoom if needed
        leafletMap.fitBounds(bounds, { padding: [50, 50] });

        // If after fitting, the map is too zoomed in for a national view (e.g., only 1-2 markers),
        // or if it goes outside the desired full India view, reset it.
        // This makes sure the map isn't too granular unless intended by closer interaction.
        if (!INDIA_BOUNDS.contains(leafletMap.getBounds()) || leafletMap.getZoom() > 7) {
          leafletMap.fitBounds(INDIA_BOUNDS, { padding: [20, 20], maxZoom: 5 });
        }

      } else {
        // If no stores are filtered, always show the full India view
        leafletMap.fitBounds(INDIA_BOUNDS, { padding: [20, 20], maxZoom: 5 });
      }
    }
  }, [stores]); // Dependency: re-run when 'stores' data changes

  // Function to determine marker color based on carbon footprint
  const getMarkerColor = (carbonFootprint) => {
    if (carbonFootprint <= 90) return 'green'; // Excellent performance
    if (carbonFootprint <= 110) return 'gold'; // Good performance
    return 'red'; // Poor performance
  };

  // Custom DivIcon for color-coded circular markers with animations
  const createCustomDivIcon = (color) => {
    let animationClass = '';
    if (color === 'red') {
      animationClass = 'radiating-marker'; // For the 'danger' effect
    } else if (color === 'green') {
      animationClass = 'calming-marker'; // For the 'live' effect
    }

    return L.divIcon({
      className: `custom-marker-div ${color}-marker ${animationClass}`, // Add classes for custom styling and animation
      html: `<div class="marker-inner"></div>`, // Inner div for the actual colored circle
      iconSize: [24, 24], // Size of the div for layout
      iconAnchor: [12, 12], // Center the icon visually
      popupAnchor: [0, -10], // Adjust popup position relative to icon
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={4} // **Set initial zoom level to 4 (more zoomed out for full India view)**
      scrollWheelZoom={true} // Enable zoom with scroll wheel
      style={containerStyle}
      maxBounds={INDIA_BOUNDS} // **Restrict map panning to India's expanded bounds**
      minZoom={4} // **Prevent zooming out beyond this level (shows full India)**
      maxZoom={10} // Prevent zooming in too far
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance; // Store map instance in ref
        // On initial load, fit to the full India bounds
        mapInstance.fitBounds(INDIA_BOUNDS, { padding: [20, 20], maxZoom: 5 });
      }}
    >
      {/* OpenStreetMap Tile Layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render Markers for each filtered store */}
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.location.lat, store.location.lng]}
          icon={createCustomDivIcon(getMarkerColor(store.performance.carbonFootprint.current))}
          eventHandlers={{
            click: () => onStoreClick(store), // Make marker clickable
          }}
        >
          {/* Optional Popup on hover/click (can be used alongside or instead of side drawer) */}
          <Popup>
            <strong className="text-sm text-[#0e1a13]">{store.name}</strong><br />
            <span className="text-xs text-[#51946b]">Carbon: {store.performance.carbonFootprint.current} {store.performance.carbonFootprint.unit}</span>
          </Popup>
        </Marker>
      ))}

      {/* Global CSS for custom markers and animations */}
      {/* Moved inline style tag here for clarity and self-containment */}
      <style jsx global>{`
        /* Base custom marker styling */
        .custom-marker-div {
          border: none !important; /* Remove Leaflet's default border */
          background-color: transparent !important; /* Make background transparent */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-marker-div .marker-inner {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          transform: scale(1); /* Initial scale for animations */
        }

        /* Color definitions */
        .green-marker .marker-inner { background-color: #39e079 !important; } /* A vibrant green */
        .red-marker .marker-inner { background-color: #e72a08 !important; } /* A bright red */
        .gold-marker .marker-inner { background-color: #FFD700 !important; } /* Gold for neutral/average */
        .orange-marker .marker-inner { background-color: #FFA500 !important; } /* Orange for slightly off-target */


        /* --- Marker Animations --- */

        /* Radiating/Danger Red Marker Animation */
        .radiating-marker {
            overflow: visible; /* Allow pseudo-elements to extend beyond */
        }

        .radiating-marker .marker-inner {
            position: relative;
            z-index: 2; /* Ensure the main dot is above pulses */
        }

        .radiating-marker::before,
        .radiating-marker::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background-color: rgba(231, 42, 8, 0.7); /* Red with opacity */
            animation: pulse-red 2s infinite cubic-bezier(0.66, 0, 0, 1);
            z-index: 1; /* Below the main dot */
        }

        .radiating-marker::after {
            animation-delay: 1s; /* Stagger the second pulse for a double pulse effect */
        }

        @keyframes pulse-red {
            0% {
                width: 20px;
                height: 20px;
                opacity: 0.7;
            }
            100% {
                width: 60px; /* Max size of pulse */
                height: 60px;
                opacity: 0;
            }
        }


        /* Calming/Live Green Marker Animation */
        .calming-marker .marker-inner {
            animation: breathe-green 3s infinite ease-in-out;
        }

        @keyframes breathe-green {
            0% {
                transform: scale(1);
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            }
            50% {
                transform: scale(1.1); /* Slightly larger */
                box-shadow: 0 4px 10px rgba(57, 224, 121, 0.6); /* Green glow */
            }
            100% {
                transform: scale(1);
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            }
        }
      `}</style>
    </MapContainer>
  );
};

export default IndiaMap;