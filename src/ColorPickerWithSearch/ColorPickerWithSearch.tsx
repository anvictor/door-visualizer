import React, { useEffect, useState } from "react";
import colorsData from "../colorsRal.json";

interface ColorPickerProps {
  label: string;
  getColor: Function;
}

const ColorPicker = ({ getColor, label }: ColorPickerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [active, setActive] = useState(false);

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const filteredColors = colorsData.colors.filter(
    (color: { displayName: string }) => {
      return color.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    }
  );
  const handleOptionClick = (color: string) => {
    setSelectedColor(color);
    getColor(color);
  };
  useEffect(() => {
    setActive(false);
  }, [selectedColor]);

  return (
    <div className="ColorPickerWithSearch" >
      <p className="ColorPickerWithSearch_label">
        {label}
        {selectedColor && <span>{`: ${selectedColor}`}</span>}
      </p>
      <div className="ColorPickerWithSearch_dropdown">
        <input
          className="ColorPickerWithSearch_input"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search colors..."
          onFocus={() => setActive(true)}
        />
        <div
          className={`ColorPickerWithSearch_options${active ? "_active" : ""}`}
        >
          {filteredColors.map(
            (color: { id: string; hex: string; displayName: string }) => (
              <div
                key={color.id}
                style={{ backgroundColor: color.hex, cursor: "pointer" }}
                onClick={() => handleOptionClick(color.id)}
              >
                {color.displayName}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
