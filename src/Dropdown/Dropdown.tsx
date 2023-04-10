import React, { useState, ChangeEvent } from "react";
import {OptionType}from '../types';

interface DropdownProps {
  options: OptionType[];
  label: string;
  className: string;
  onChange: (selectedValue: string) => void;
  value:string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, onChange, className, value}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={`dropdown ${className}`}>
      <label htmlFor="dropdown">{label}</label>
      <select
        id="dropdown"
        value={selectedValue}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.displayName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
