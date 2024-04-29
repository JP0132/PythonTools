import React, { useState } from "react";

interface ToolButtonProps {
  name: string;
  description: string;
  icon: any;
  hoverColour: string;
  colour: string;
  onClick: () => void;
}

const ToolButtons: React.FC<ToolButtonProps> = ({
  name,
  description,
  icon,
  hoverColour,
  colour,
  onClick,
}) => {
  //const cardBg = "bg-" + colour + "-500";
  const cardBg = `bg-${colour}-500`;
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    onClick(); // Call the onClick function passed as prop
  };

  const hoverStyle = {
    backgroundColor: hovered ? colour : hoverColour,
    cursor: "pointer",
  };
  const descriptionStyle = {
    // color: hovered ? hoverColour : "#ffffff",
    cursor: "pointer",
  };

  return (
    <div
      style={hoverStyle}
      className={` min-w-[50px] min-h-[300px] max-w-[210px] flex flex-col p-2 justify-center items-center rounded shadow-lg`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: "150px" }}>{icon()}</div>
      <div className={`px-6 py-4`}>
        <h1 className={`text-xl font-bold mb-2`}>{name}</h1>
        <p style={descriptionStyle} className={`text-base`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ToolButtons;
