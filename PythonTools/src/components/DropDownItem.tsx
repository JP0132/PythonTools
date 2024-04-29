import React from "react";

interface DropDownItemProps {
  text: string;
  value: string;
  onSelect: (value: string) => void;
}

const DropDownItem: React.FC<DropDownItemProps> = ({
  text,
  value,
  onSelect,
}) => {
  return (
    <li onClick={() => onSelect(value)}>
      <a>{text}</a>
    </li>
  );
};

export default DropDownItem;
