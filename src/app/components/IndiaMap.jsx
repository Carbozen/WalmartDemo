"use client";

import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  iconRetinaUrl: iconRetina.src,
  shadowUrl: shadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "0.5rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const INDIA_BOUNDS = L.latLngBounds(
  [7.0, 67.0],
  [37.5, 98.0]
);

const center = [22.3511147, 78.6677428];

const IndiaMap = ({ stores, onStoreClick, filterType }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
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
    }
  }, [stores]);

  const getMarkerColor = (carbonFootprint) => {
    if (carbonFootprint <= 90) return "green";
    if (carbonFootprint <= 110) return "gold";
    return "red";
  };

  const createCustomDivIcon = (color) => {
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

  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={true}
      style={containerStyle}
      maxBounds={INDIA_BOUNDS}
      minZoom={4}
      maxZoom={10}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
        mapInstance.fitBounds(INDIA_BOUNDS, { padding: [20, 20], maxZoom: 5 });
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.location.lat, store.location.lng]}
          icon={createCustomDivIcon(
            getMarkerColor(store.performance.carbonFootprint.current)
          )}
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
      ))}

      <style jsx global>{`
        .custom-marker-div {
          border: none !important;
          background-color: transparent !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-marker-div .marker-inner {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          transform: scale(1);
        }

        .green-marker .marker-inner {
          background-color: #39e079 !important;
        }
        .red-marker .marker-inner {
          background-color: #e72a08 !important;
        }
        .gold-marker .marker-inner {
          background-color: #ffd700 !important;
        }
        .orange-marker .marker-inner {
          background-color: #ffa500 !important;
        }

        .radiating-marker {
          overflow: visible;
        }

        .radiating-marker .marker-inner {
          position: relative;
          z-index: 2;
        }

        .radiating-marker::before,
        .radiating-marker::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #e72a08;
          transform: translate(-50%, -50%);
          animation: pulse 2s infinite;
        }

        .radiating-marker::after {
          animation-delay: 1s;
        }

        .calming-marker .marker-inner {
          animation: breathe 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </MapContainer>
  );
};

export default IndiaMap;
