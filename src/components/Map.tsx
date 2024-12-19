import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import React, { useState } from 'react';
import { coworkingSpaces, CoworkingSpace } from '../data/coworkingSpaces';
import CoworkingSpaceCard from './CoworkingSpaceCard';
import 'leaflet/dist/leaflet.css';

const customIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

export default function Map() {
  const [activeSpace, setActiveSpace] = useState<CoworkingSpace | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredSpaces, setFilteredSpaces] = useState<CoworkingSpace[]>(coworkingSpaces);

  const handleMarkerClick = (space: CoworkingSpace) => {
    setActiveSpace(space);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();
    setSearchTerm(search);

    const filtered = coworkingSpaces.filter(space =>
      space.name.toLowerCase().includes(search)
    );
    setFilteredSpaces(filtered);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Search Bar at the top */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for a coworking space..."
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px',
          fontSize: '16px',
          zIndex: 9999,
          borderRadius: '5px',
          width: '80%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      />
      
      {/* Map */}
      <MapContainer
        center={[17.385, 78.4867]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        {filteredSpaces.map((space, index) => (
          <Marker
            key={index}
            position={space.coordinates}
            icon={customIcon}
            eventHandlers={{
              click: () => handleMarkerClick(space),
            }}
          >
            <Popup>
              <div>
                <b>Space Name:</b> {space.name}<br />
                <b>Location:</b> {space.location}<br />
                <b>Category:</b> {space.category}<br />
                <b>Price (INR):</b> {space.price}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Display the coworking space card */}
      {activeSpace && <CoworkingSpaceCard activeSpace={activeSpace} />}
    </div>
  );
}
