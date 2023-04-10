import React from "react";
import { values } from "../StellDoorVisualizer/utils";
import { ValuesType } from "../types";

export interface ValuesContextType {
  values: ValuesType;
  setValues: (newValues: Partial<ValuesContextType["values"]>) => void;
}

const ValuesContext = React.createContext<ValuesContextType>({
  values,
  setValues: () => {},
});

export default ValuesContext;
