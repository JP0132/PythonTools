import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    onClick();
  };

  const buttonStyle = {
    fontSize: "35px",
    color: hovered ? "grey" : "white",
    cursor: "pointer",
  };

  return (
    <IoArrowBack
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="mb-6"
    />
  );
};

export default BackButton;
