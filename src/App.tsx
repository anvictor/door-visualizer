import React, { useState } from "react";
import { values as valuesInit } from "./StellDoorVisualizer/utils";
import "./App.css";
import StellDoorVisualizer from "./StellDoorVisualizer/StellDoorVisualizer";
import ConfigureMenu from "./ConfigureMenu/ConfigureMenu";

function App() {
  const [values, setValues] = useState(valuesInit);
  const getValues = (values: any) => {
    setValues(values);
  };

  return (
    <div className="App">
      <ConfigureMenu values={values} getValues={getValues} />
      <div className="Visualizer">
        <StellDoorVisualizer values={values} />
      </div>
    </div>
  );
}

export default App;
