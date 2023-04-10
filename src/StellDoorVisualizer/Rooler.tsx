import React from "react";

const Rooler = () => {
  return (
    <svg id = 'rooler'>
      {/* <!-- горизонтальна лінійка --> */}
      <rect x="10" y="50" width="1000" height="20" stroke="black" fill="none" />

      {/* <!-- позначки на лінійці --> */}
      <g stroke="black" strokeWidth="1">
        {/* <!-- змінна частина: зафарбовані сегменти --> */}
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
      </g>
    </svg>
  );
};

export default Rooler;
