import React, { useState } from "react";
import ColorPickerWithSearch from "../ColorPickerWithSearch/ColorPickerWithSearch";

interface ConfigureMenuProps {
  values: any;
  getValues: Function;
}
const ConfigureMenu = ({
  values: incomingValues,
  getValues,
}: ConfigureMenuProps) => {
  const [values, setValues] = useState({ ...incomingValues });

  const onChange = (propName: string, value: string) => {
    const newValues = { ...values };
    newValues[propName] = value;
    setValues(newValues);
    getValues(newValues);
  };

  return (
    <div className="ConfigureMenu">
      <div className="colorLine">
        <ColorPickerWithSearch
          getColor={(value: string) => onChange("doorLeafColor", value)}
          label="Door Leaf Color"
        />
        <ColorPickerWithSearch
          getColor={(value: string) => onChange("frameColor", value)}
          label="Door Frame Color"
        />
      </div>
    </div>
  );
};

export default ConfigureMenu;
