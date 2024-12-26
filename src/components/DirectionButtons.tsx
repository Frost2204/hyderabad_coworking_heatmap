import React from 'react';

interface DirectionButtonsProps {
  onDirectionClick: (direction: string) => void;
}

const DirectionButtons: React.FC<DirectionButtonsProps> = ({ onDirectionClick }) => {
  return (
    <div
      style={{
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // Default visibility for larger screens, hidden for mobile
        visibility: 'visible',
      }}
      className="direction-buttons"
    >
      {/* North button */}
      <button onClick={() => onDirectionClick('north')} style={buttonStyle}>
        N
      </button>

      {/* East-West buttons */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => onDirectionClick('west')} style={buttonStyle}>
          W
        </button>
        <button onClick={() => onDirectionClick('east')} style={buttonStyle}>
          E
        </button>
      </div>

      {/* South button */}
      <button onClick={() => onDirectionClick('south')} style={buttonStyle}>
        S
      </button>
    </div>
  );
};

const buttonStyle = {
  width: '50px',  // Default width for larger buttons
  height: '50px', // Default height for larger buttons
  margin: '5px',
  fontSize: '18px',  // Larger font size for better readability
  cursor: 'pointer',
  backgroundColor: '#3388ff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.3s ease', // Smooth scale on hover
};

// Mobile responsive adjustments using media queries
const mobileStyle = {
  '@media (max-width: 768px)': {
    '.direction-buttons': {
      display: 'none', // Hide the direction buttons on mobile
    },
  },
};

export default DirectionButtons;
