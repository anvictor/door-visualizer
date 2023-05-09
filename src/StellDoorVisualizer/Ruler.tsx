import React from "react";

const Ruler = () => {
return (
<svg id="ruler">
{/* horizontal ruler */}
<rect x="10" y="50" width="1000" height="20" stroke="black" fill="none" />

  {/* marks on the ruler */}
  <g stroke="black" strokeWidth="1">
    {/* variable part: colored segments */}
    <rect x="10" y="50" width="100" height="20" className="black" />
    <rect x="210" y="50" width="100" height="20" className="black" />
    <rect x="410" y="50" width="100" height="20" className="black" />
    <rect x="610" y="50" width="100" height="20" className="black" />
    <rect x="810" y="50" width="100" height="20" className="black" />

    <rect x="110" y="50" width="100" height="20" className="white" />
    <rect x="310" y="50" width="100" height="20" className="white" />
    <rect x="510" y="50" width="100" height="20" className="white" />
    <rect x="710" y="50" width="100" height="20" className="white" />
    <rect x="910" y="50" width="100" height="20" className="white" />

    {/* text label for the ruler */}
    <text x="340" y="150" fontSize="100">
      1 meter
    </text>
  </g>
</svg>
);
};

export default Ruler;