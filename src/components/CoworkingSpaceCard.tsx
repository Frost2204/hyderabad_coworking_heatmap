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
    padding: "10px 50px",
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
    zIndex: 10000,
  };

  const slideStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "10px",
  };

  const phoneStyle: React.CSSProperties = {
    fontWeight: "bold",
    color: "#007bff",
    textDecoration: "none",
    marginRight: "10px", // Space between numbers
  };

  return (
    <div style={cardStyle}>
      <button style={closeButtonStyle} onClick={onClose}>
        ✖
      </button>

      <Swiper spaceBetween={10} slidesPerView={1} modules={[Navigation]} navigation>
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
              <p>
                <strong>Coordinates:</strong> ({space.coordinates[0]},{" "}
                {space.coordinates[1]})
              </p>
              {space.poc && (
                <p>
                  <strong>Point of Contact:</strong> {space.poc.name} -{" "}
                  {space.poc.contact
                    .split("/") // Split the contact string by "/"
                    .map((phone, idx) => (
                      <a key={idx} href={`tel:${phone.trim()}`} style={phoneStyle}>
                        {phone.trim()}
                      </a>
                    ))}
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CoworkingSpaceCard;
