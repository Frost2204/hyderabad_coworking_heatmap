import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import React, { useState, useMemo } from "react";
import { coworkingSpaces, CoworkingSpace } from "../data/coworkingSpaces";
import CoworkingSpaceCard from "./CoworkingSpaceCard";
import "leaflet/dist/leaflet.css";
import "swiper/swiper-bundle.css"; // Swiper styles
import Swiper from "swiper";

const customIcon = new Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Component to adjust map view with smooth animation
const MapViewUpdater = ({ position }: { position: [number, number] }) => {
  const map = useMap();

  map.flyTo(position, map.getZoom(), {
    duration: 1.5,
    easeLinearity: 0.25,
  });

  return null;
};

export default function Map() {
  const [activeSpaces, setActiveSpaces] = useState<CoworkingSpace[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Memoize the filtered spaces based on search term to optimize performance
  const filteredSpaces = useMemo(() => {
    return coworkingSpaces.filter((space) =>
      Object.values(space).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleMarkerClick = (coordinates: [number, number]) => {
    const spacesAtSameLocation = coworkingSpaces.filter(
      (space) =>
        space.coordinates[0] === coordinates[0] &&
        space.coordinates[1] === coordinates[1]
    );
    setActiveSpaces(spacesAtSameLocation);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Group spaces by unique location to prevent repeated tooltips
  const groupedSpaces = useMemo(() => {
    const grouped: { [key: string]: CoworkingSpace[] } = {};
    filteredSpaces.forEach((space) => {
      const key = space.coordinates.join(",");
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(space);
    });
    return grouped;
  }, [filteredSpaces]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search here..."
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px",
          fontSize: "16px",
          zIndex: 9999,
          borderRadius: "5px",
          width: "80%",
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      />

      <MapContainer
        center={[17.385, 78.4867]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {Object.keys(groupedSpaces).map((key) => {
          const spacesAtLocation = groupedSpaces[key]; // Get all spaces at this location
          const space = spacesAtLocation[0]; // Take the first space as representative for the location
          const numSpaces = spacesAtLocation.length; // Number of spaces at this location

          return (
            <Marker
              key={key}
              position={space.coordinates}
              icon={
                new DivIcon({
                  className: "custom-div-icon",
                  html: `<div style="background-color: #3388ff; color: white; padding: 5px; border-radius: 50%; text-align: center; font-size: 12px; font-weight: bold; width: 25px; height: 25px;">${numSpaces}</div>`,
                  iconSize: [30, 30],
                  iconAnchor: [15, 15],
                })
              }
              eventHandlers={{
                click: () => handleMarkerClick(space.coordinates),
              }}
            >
              {/* Tooltip for displaying location name only once per location */}
              <Tooltip direction="top" offset={[0, -20]} permanent>
                {space.location}
              </Tooltip>
            </Marker>
          );
        })}

        {activeSpaces.length > 0 && (
          <MapViewUpdater position={activeSpaces[0].coordinates} />
        )}
      </MapContainer>

      {activeSpaces.length > 0 && (
        <CoworkingSpaceCard
          activeSpaces={activeSpaces}
          onClose={() => setActiveSpaces([])}
        />
      )}
    </div>
  );
}
