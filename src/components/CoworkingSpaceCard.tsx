import React from "react";
import { CoworkingSpace } from "../data/coworkingSpaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface CoworkingSpaceCardProps {
  activeSpaces: CoworkingSpace[];
  onClose: () => void;
}

const CoworkingSpaceCard: React.FC<CoworkingSpaceCardProps> = ({
  activeSpaces,
  onClose,
}) => {
  const cardStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "15px",
    padding: "10px 50px",  // Increased horizontal padding to 80px
    maxWidth: "400px",
    color: "black",
    textAlign: "left",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    overflow: "hidden",
    width: "90%",
    maxHeight: "50vh",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    cursor: "pointer",
    zIndex: 10000, // Higher than the card's z-index
  };

  const slideStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)", // Subtle gradient for background
    borderRadius: "10px", // Rounded corners for the slide
    padding: "20px", // Padding inside the slide
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for depth
    margin: "10px", // Space between slides
  };

  const navigationButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "60%",
    transform: "translateY(-50%)",
    zIndex: 1000,
    background: "rgba(255, 255, 255, 0.8)", // Light background color
    color: "#555", // Light gray color for the arrow
    border: "1px solid #ddd", // Subtle border
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
  };

  return (
    <div style={cardStyle}>
      <button style={closeButtonStyle} onClick={onClose}>
        ✖
      </button>

      {/* Navigation Buttons */}
      <button
        style={{ ...navigationButtonStyle, left: "10px" }}
        className="swiper-button-prev"
      >
        &#9664;
      </button>
      <button
        style={{ ...navigationButtonStyle, right: "10px" }}
        className="swiper-button-next"
      >
        &#9654;
      </button>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {activeSpaces.map((space, index) => (
          <SwiperSlide key={index}>
            <div style={slideStyle}>
              <h3>{space.name}</h3>
              <p>
                <strong>Location:</strong> {space.location}
              </p>
              <p>
                <strong>Category:</strong> {space.category}
              </p>
              <p>
                <strong>Price (INR):</strong> {space.price}
              </p>
              <p>
                <strong>Area:</strong> {space.area}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CoworkingSpaceCard;
