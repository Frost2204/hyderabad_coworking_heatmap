import React from "react";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void; // New prop for handling Enter key
  onClear: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  onClear,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearchSubmit(); // Call the search submit handler
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "80%",
        maxWidth: "400px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "5px",
        padding: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 9999,
      }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        onKeyDown={handleKeyDown} // Add keydown handler
        placeholder="Search here..."
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          fontSize: "16px",
          paddingRight: "30px", // Space for the clear button
        }}
      />
      {searchTerm && (
        <button
          onClick={onClear}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            fontSize: "18px",
            cursor: "pointer",
            position: "absolute",
            right: "10px",
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchInput;
