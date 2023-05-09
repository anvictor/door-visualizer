import React, {  ChangeEvent } from "react";

interface NumericInputPropsType {
  min: number;
  max: number;
  label: string;
  className?: string;
  value: number;
  getNumber: Function;
  disabled?: boolean;
}

const NumericInput: React.FC<NumericInputPropsType> = ({
  min,
  max,
  label,
  className,
  value,
  getNumber,
  disabled,
}) => {

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
      <p style={{marginRight: "5px"}}>{label}:</p>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default NumericInput;
