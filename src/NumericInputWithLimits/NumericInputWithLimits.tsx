import React, { useState, ChangeEvent } from "react";

interface NumericInputPropsType {
  min: number;
  max: number;
  label: string;
  className: string;
  value: number;
  getNumber: Function;
}

const NumericInput: React.FC<NumericInputPropsType> = ({
  min,
  max,
  label,
  className,
  value,//: incomingValue,
  getNumber,
}) => {
  // const [value, setValue] = useState<number>(incomingValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = parseInt(event.target.value, 10);

    // Check if input is a number
    if (!isNaN(inputValue)) {
      // Clamp the value between min and max
      const clampedValue = Math.min(Math.max(inputValue, min), max);
      // setValue(clampedValue);
      getNumber(clampedValue);
    }
  };

  return (
    <div className={`numInput ${className}`}>
      <p>{label}</p>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
      />
    </div>
  );
};

export default NumericInput;
