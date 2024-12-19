import React from 'react';
import { CoworkingSpace } from '../data/coworkingSpaces';

interface CoworkingSpaceCardProps {
  activeSpace: CoworkingSpace;
}

const CoworkingSpaceCard: React.FC<CoworkingSpaceCardProps> = ({ activeSpace }) => {
  const cardStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.2)",    // Transparent background
    backdropFilter: "blur(10px)",              // Blur effect
    borderRadius: "15px",                      // Rounded corners
    padding: "20px",                           // Padding
    minWidth: "300px",                         // Minimum width
    maxWidth: "400px",                         // Maximum width
    color: "black",                            // Text color
    textAlign: "left",                         // Text alignment
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow effect
    pointerEvents: "auto",                     // Ensure the card can be interacted with
    position: "fixed",                         // Fix the card position
    zIndex: 9999,                              // High Z-index to make sure it's on top
    maxHeight: "90vh",                         // Restrict max height
    overflow: "auto",                          // Scrollable content if it exceeds height
    width: "80%",                              // Set the width
  };

  return (
    <div style={cardStyle} className="coworkingSpaceCard centered">
      <h3 style={{ fontWeight: 'bold', fontSize: '24px', color: 'black' }}>
        {activeSpace.name}
      </h3>
      <p><strong>Location:</strong> {activeSpace.location}</p>
      <p><strong>Category:</strong> {activeSpace.category}</p>
      <p><strong>Price (INR):</strong> {activeSpace.price}</p>
    </div>
  );
};

export default CoworkingSpaceCard;
