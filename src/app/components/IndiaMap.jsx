"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-leaflet components with no SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "0.5rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const IndiaMap = ({ stores, onStoreClick, filterType }) => {
  const mapRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [leafletData, setLeafletData] = useState(null);

  useEffect(() => {
    setIsClient(true);
    
    // Initialize Leaflet only on client side
    if (typeof window !== "undefined") {
      const L = require("leaflet");
      
      // Import marker icons
      const icon = require("leaflet/dist/images/marker-icon.png");
      const iconRetina = require("leaflet/dist/images/marker-icon-2x.png");
      const shadow = require("leaflet/dist/images/marker-shadow.png");

      const DefaultIcon = L.icon({
        iconUrl: icon.default || icon,
        iconRetinaUrl: iconRetina.default || iconRetina,
        shadowUrl: shadow.default || shadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      L.Marker.prototype.options.icon = DefaultIcon;

      const INDIA_BOUNDS = L.latLngBounds([7.0, 67.0], [37.5, 98.0]);

      const center = [22.3511147, 78.6677428];

      setLeafletData({ L, INDIA_BOUNDS, center });
    }
  }, []);

  // Load Leaflet CSS dynamically
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if Leaflet CSS is already loaded
      const existingLink = document.querySelector('link[href*="leaflet.css"]');
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
      }
    }
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current || !leafletData) return;

    const { L, INDIA_BOUNDS } = leafletData;
    const leafletMap = mapRef.current;

    if (stores.length > 0) {
      const bounds = L.latLngBounds(
        stores.map((store) => [store.location.lat, store.location.lng])
      );
      leafletMap.fitBounds(bounds, { padding: [50, 50] });

      if (
        !INDIA_BOUNDS.contains(leafletMap.getBounds()) ||
        leafletMap.getZoom() > 7
      ) {
        leafletMap.fitBounds(INDIA_BOUNDS, { padding: [20, 20], maxZoom: 5 });
      }
    } else {
      leafletMap.fitBounds(INDIA_BOUNDS, { padding: [20, 20], maxZoom: 5 });
    }
  }, [stores, isClient, leafletData]);

  const getMarkerColor = (carbonFootprint) => {
    if (carbonFootprint <= 90) return "green";
    if (carbonFootprint <= 110) return "gold";
    return "red";
  };

  const createCustomDivIcon = (color) => {
    if (!leafletData) return null;
    
    const { L } = leafletData;
    let animationClass = "";
    if (color === "red") {
      animationClass = "radiating-marker";
    } else if (color === "green") {
      animationClass = "calming-marker";
    }

    return L.divIcon({
      className: `custom-marker-div ${color}-marker ${animationClass}`,
      html: `<div class="marker-inner"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -10],
    });
  };

  // Don't render anything until client-side and Leaflet is loaded
  if (!isClient || !leafletData) {
    return (
      <div
        style={containerStyle}
        className="flex items-center justify-center bg-gray-100"
      >
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  const { center } = leafletData;

  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={true}
      style={containerStyle}
      maxBounds={leafletData.INDIA_BOUNDS}
      minZoom={4}
      maxZoom={10}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
        mapInstance.fitBounds(leafletData.INDIA_BOUNDS, {
          padding: [20, 20],
          maxZoom: 5,
        });
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stores.map((store) => {
        const icon = createCustomDivIcon(
          getMarkerColor(store.performance.carbonFootprint.current)
        );
        
        if (!icon) return null;
        
        return (
          <Marker
            key={store.id}
            position={[store.location.lat, store.location.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onStoreClick(store),
            }}
          >
            <Popup>
              <strong className="text-sm text-[#0e1a13]">{store.name}</strong>
              <br />
              <span className="text-xs text-[#51946b]">
                Carbon: {store.performance.carbonFootprint.current}{" "}
                {store.performance.carbonFootprint.unit}
              </span>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default IndiaMap;
