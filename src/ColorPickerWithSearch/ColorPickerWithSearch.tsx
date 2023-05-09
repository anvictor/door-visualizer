import React, { ChangeEvent, useEffect, useState } from "react";
import colorsData from "../colorsRal.json";

interface Color {
  id: string;
  hex: string;
  displayName: string;
}

interface ColorPickerProps {
  label: string;
  getColor: (color: string) => void;
  className: string;
  colorName: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  getColor,
  label,
  className,
  colorName,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorName);
  const [active, setActive] = useState(false);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredColors = colorsData.colors.filter((color: Color) =>
    color.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredColor = colorsData.colors.find((color: Color) =>
    color.id.toLowerCase().includes(selectedColor.toLowerCase())
  );
  const displayName = colorName ? filteredColor?.displayName : "";

  const handleOptionClick = (color: string) => {
    setSelectedColor(color);
    getColor(color);
    setSearchTerm("");
  };

  useEffect(() => {
    setActive(false);
  }, [selectedColor]);

  return (
    <div className={`ColorPickerWithSearch ${className}`}>
      <p className="ColorPickerWithSearch_label" style={{ marginRight: "5px" }}>
        {label}:
      </p>
      <div className="ColorPickerWithSearch_dropdown">
        <input
          className="ColorPickerWithSearch_input"
          type="text"
          value={searchTerm || displayName || ""}
          onChange={handleSearch}
          placeholder="Search colors..."
          onFocus={() => setActive(true)}
        />
        {searchTerm && (
          <div
            className={`ColorPickerWithSearch_options${
              active ? "_active" : ""
            }`}
          >
            {filteredColors.map((color: Color) => (
              <div
                key={color.id}
                style={{ backgroundColor: color.hex, cursor: "pointer" }}
                onClick={() => handleOptionClick(color.id)}
              >
                {color.displayName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
