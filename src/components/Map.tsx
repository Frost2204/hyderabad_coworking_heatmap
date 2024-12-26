import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import React, { useState } from "react";
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
  const [filteredSpaces, setFilteredSpaces] =
    useState<CoworkingSpace[]>(coworkingSpaces);

  const handleMarkerClick = (coordinates: [number, number]) => {
    const spacesAtSameLocation = coworkingSpaces.filter(
      (space) =>
        space.coordinates[0] === coordinates[0] &&
        space.coordinates[1] === coordinates[1]
    );
    setActiveSpaces(spacesAtSameLocation);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();
    setSearchTerm(search);

    const filtered = coworkingSpaces.filter((space) =>
      Object.values(space)
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
    setFilteredSpaces(filtered);
  };

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

        {filteredSpaces.map((space, index) => (
          <Marker
            key={index}
            position={space.coordinates}
            icon={customIcon}
            eventHandlers={{
              click: () => handleMarkerClick(space.coordinates),
            }}
          >
            <Popup>{space.name}</Popup>
          </Marker>
        ))}

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
