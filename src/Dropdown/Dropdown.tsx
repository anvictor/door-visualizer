import React, { useState, ChangeEvent, useEffect } from "react";
import { OptionType } from "../types";

interface DropdownProps {
  options: OptionType[];
  label: string;
  className: string;
  onChange: (selectedValue: string) => void;
  value: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  onChange,
  className,
  value,
  disabled,
}) => {
  const [selectedValue, setSelectedValue] = useState(value);
 
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };
  useEffect(()=>{
    setSelectedValue(value)
  },[value]);
  return (
    <div className={`dropdown ${className}`}>
      <label htmlFor="dropdown" style={{marginRight:'5px'}}>{label}:</label>
      <select
        id="dropdown"
        value={selectedValue}
        onChange={handleChange}
        disabled={disabled}
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
