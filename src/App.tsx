import React, { useState } from "react";
import { values as initValues } from "./StellDoorVisualizer/utils";
import "./App.css";
import StellDoorVisualizer from "./StellDoorVisualizer/StellDoorVisualizer";
import ConfigureMenu from "./ConfigureMenu/ConfigureMenu";
import ValuesContext, {
  ValuesContextType,
} from "./ValuesContext/ValuesContext";

function App() {
  const [values, setValues] = useState<ValuesContextType["values"]>(initValues);

  const updateValues = (newValues: Partial<ValuesContextType["values"]>) => {
    setValues((prevState) => ({ ...prevState, ...newValues }));
  };

  
  return (
    <ValuesContext.Provider value={{ values, setValues: updateValues }}>
      <div className="App">
        <ConfigureMenu />
        <div className="Visualizer">
          <StellDoorVisualizer />
        </div>
      </div>
    </ValuesContext.Provider>
  );
}

export default App;
