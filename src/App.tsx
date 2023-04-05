import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StellDoorVisualizer from "./StellDoorVisualizer/StellDoorVisualizer";
const values = {
  dimensions: {
    doorSize: { width: 920, height:2200 },
  },
  leavesCount: 2,
  dinDirection: "left",
  hingesCount: 3,
  useGlazing: false,
  useDoorCloser: false,
  doorCloser: 'up',
  thirdHingePosition: "middle",
  handleHeight: 1050,
};
function App() {
  return (
    <div className="App">
      <StellDoorVisualizer values = {values} frameSurfaceColor={"green"}
    doorLeafSurfaceColor={"red"} />
    </div>
  );
}

export default App;
