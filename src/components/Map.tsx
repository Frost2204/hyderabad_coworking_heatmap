import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { DivIcon, LatLngBounds } from "leaflet";
import React, { useState, useMemo, useRef } from "react";
import { coworkingSpaces, CoworkingSpace } from "../data/coworkingSpaces";
import CoworkingSpaceCard from "./CoworkingSpaceCard";
import "leaflet/dist/leaflet.css";
import "swiper/swiper-bundle.css"; // Swiper styles
import Swiper from "swiper";
import SearchInput from "./SearchInput"; // Import SearchInput

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

  const mapRef = useRef<any>(null); // Ref to access map instance

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

  const handleClearSearch = () => {
    setSearchTerm(""); // Clear search term
    setActiveSpaces([]); // Reset active spaces
  };

  const handleSearchSubmit = () => {
    if (filteredSpaces.length === 0) return;

    // Compute bounds for the filtered spaces
    const bounds = new LatLngBounds(
      filteredSpaces.map((space) => space.coordinates)
    );

    const map = mapRef.current; // Access the map instance via ref
    if (map) {
      map.fitBounds(bounds, { padding: [50, 50] }); // Adjust padding as needed
    }
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
      {/* Search Input */}
      <SearchInput
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit} // Pass the submit handler
        onClear={handleClearSearch}
      />

      {/* Map */}
      <MapContainer
        center={[17.45, 78.47]} 
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef} // Pass the map ref
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
              <Tooltip direction="top" offset={[0, -20]} permanent>
                {space.location}
              </Tooltip>
            </Marker>
          );
        })}

        {activeSpaces.length > 0 && <MapViewUpdater position={activeSpaces[0].coordinates} />}
      </MapContainer>

      {activeSpaces.length > 0 && (
        <CoworkingSpaceCard activeSpaces={activeSpaces} onClose={() => setActiveSpaces([])} />
      )}
    </div>
  );
}
