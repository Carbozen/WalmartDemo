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

// Approximate center of India for initial map view
const center = [22.3511147, 78.6677428];

const IndiaMap = ({ stores, onStoreClick, filterType }) => {
  const mapRef = useRef(null);

  // Adjust map view to fit all markers when stores prop changes
  // or when map initializes. This provides a better UX.
  useEffect(() => {
    if (mapRef.current && stores.length > 0) {
      const leafletMap = mapRef.current;
      const bounds = L.latLngBounds(stores.map(store => [store.location.lat, store.location.lng]));
      leafletMap.fitBounds(bounds, { padding: [50, 50] }); // Add some padding around markers
    }
  }, [stores]); // Dependency array: re-run effect when 'stores' data changes

  // Function to determine marker color based on carbon footprint and filter type
  const getMarkerColor = (carbonFootprint, filterType) => {
    // Assuming lower carbon footprint is better
    if (filterType === 'best') {
      if (carbonFootprint <= 90) return 'green'; // Excellent performance
      if (carbonFootprint <= 110) return 'orange'; // Good performance
      return 'red'; // Poor performance
    } else if (filterType === 'worst') {
      if (carbonFootprint >= 130) return 'red'; // Worst performance
      if (carbonFootprint >= 110) return 'orange'; // Moderate performance
      return 'green'; // Best performance (in this filtered context)
    }
    // Default for 'all' stores, showing a general spectrum
    if (carbonFootprint <= 90) return 'green';
    if (carbonFootprint <= 110) return 'gold'; // Neutral/average
    return 'red';
  };

  // Custom DivIcon for color-coded circular markers
  const createCustomDivIcon = (color) => {
    return L.divIcon({
      className: `custom-marker-div ${color}-marker`, // Add a class for custom styling
      html: `<div style="background-color: ${color}; border: 2px solid white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24], // Size of the div
      iconAnchor: [12, 12], // Center the icon
      popupAnchor: [0, -10], // Adjust popup position relative to icon
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={5} // Initial zoom level for India
      scrollWheelZoom={true} // Enable zoom with scroll wheel
      style={containerStyle}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance; // Store map instance in ref
      }}
    >
      {/* OpenStreetMap Tile Layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render Markers for each store */}
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.location.lat, store.location.lng]}
          icon={createCustomDivIcon(getMarkerColor(store.performance.carbonFootprint.current, filterType))}
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
      <style jsx global>{`
        /* Custom marker styling */
        .custom-marker-div {
          border: none !important; /* Remove Leaflet's default border */
          background-color: transparent !important; /* Make background transparent */
        }
        .green-marker div { background-color: #39e079 !important; } /* A vibrant green */
        .red-marker div { background-color: #e72a08 !important; } /* A bright red */
        .gold-marker div { background-color: #FFD700 !important; } /* Gold for neutral/average */
        .orange-marker div { background-color: #FFA500 !important; } /* Orange for slightly off-target */
      `}</style>
    </MapContainer>
  );
};

export default IndiaMap;
