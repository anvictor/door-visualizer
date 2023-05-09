import React from "react";

interface RadioButtonProps {
  groupName: string;
  options: { value: string; displayName: string }[];
  onChange: (selectedValue: string) => void;
  disabled?: boolean;
  value?: string;
  className?: string;
}

const RadioButtonGroup: React.FC<RadioButtonProps> = ({
  groupName,
  options,
  onChange,
  disabled,
  value,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={className}>
      <p style={{ marginRight: "5px" }}>{groupName}:</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name={groupName}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              disabled={disabled}
            />
            {option.displayName}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
