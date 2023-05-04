import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as CLOSER_LD } from "../images/CLOSER_LD.svg";
import { ReactComponent as CLOSER_LU } from "../images/CLOSER_LU.svg";
import { ReactComponent as CLOSER_RD } from "../images/CLOSER_RD.svg";
import { ReactComponent as CLOSER_RU } from "../images/CLOSER_RU.svg";
import { ReactComponent as GLASSES_ROUND_300_300 } from "../images/GLASSES_ROUND_300_300.svg";
import { ReactComponent as GLASSES_SQUARE_300_300 } from "../images/GLASSES_SQUARE_300_300.svg";
import { ReactComponent as HANDLE_LONG_L_X118_Y_MIN_26 } from "../images/HANDLE_LONG_L_X118_Y_MIN_26.svg";
import { ReactComponent as HANDLE_LONG_R_X16_Y_MIN_26 } from "../images/HANDLE_LONG_R_X16_Y_MIN_26.svg";
import { ReactComponent as HANDLE_ROUND_L_X117_Y25 } from "../images/HANDLE_ROUND_L_X117_Y25.svg";
import { ReactComponent as HANDLE_ROUND_R_X25_Y25 } from "../images/HANDLE_ROUND_R_X25_Y25.svg";
import { ReactComponent as HANDLE_SQUARE_L_X118_Y26 } from "../images/HANDLE_SQUARE_L_X118_Y26.svg";
import { ReactComponent as HANDLE_SQUARE_R_X26_Y26 } from "../images/HANDLE_SQUARE_R_X26_Y26.svg";
import { ReactComponent as HINGE_18_132 } from "../images/HINGE_18_132.svg";
import ALUM_BRUSHED_H from "../images/ALUM_BRUSHED_H.png";
import ALUM_BRUSHED_V from "../images/ALUM_BRUSHED_V.png";
import colorsData from "../colorsRal.json";
import "./StellDoorVisualizer.css";
import {
  CLOSER_SHIFT_X,
  CLOSER_SHIFT_Y,
  CLOSER_WIDTH_X,
  GLASING_CENTER_SHIFT_X,
  GLASING_CENTER_SHIFT_Y,
  GLASING_CENTER_Y,
  GLASING_TYPE,
  STROKE_COLOR,
  add_10_Percents,
  getFrameClearanceHeight_Y,
  getFrameClearanceLeft_X,
  getFrameClearanceTop_Y,
  getFrameClearanceWidth_X,
  getFrameLeft_X,
  getFrameTop_Y,
  getHandleData,
  getHandle_X,
  getHandle_Y,
  getHingeDown_Y,
  getHingeLeftAdditionalVisibility,
  getHingeLeftBaseVisibility,
  getHingeLeft_X,
  getHingeMiddle_Y,
  getHingeRightAdditionalVisibility,
  getHingeRightBaseVisibility,
  getHingeRight_X,
  getHingeUp_Y,
  getLeafHeight_Y,
  getLeafTop_Y,
  getPictureLeafLeftWidth_X,
  getPictureLeafLeft_X,
  getPictureLeafRightWidth_X,
  getPictureLeafRight_X,
} from "./utils";
import ValuesContext from "../ValuesContext/ValuesContext";
import Rooler from "./Rooler";

const StellDoorVisualizer = () => {
  const { values } = useContext(ValuesContext);
  const [pullView, setPullView] = useState(true);
  const handleHoverPullView = () => {
    setPullView(!pullView);
  };
  const {
    activeLeafWidth_X,
    openDirection,
    doorCloser,
    doorLeafColor,
    frameColor,
    frameJumb_Y,
    frameJumbVisible_Y,
    frameProfileWidth_X,
    frameProfileWidthVisible_X,
    handleHeight_Y,
    hingesCount,
    doorWidth_X,
    doorHeight_Y,
    leavesCount,
    thirdHingePosition,
    thresholdHeight_Y,
    thresholdHeightVisible_Y,
    useDoorCloser,
    useGlazing,
    hingeUpUnderTop_Y,
    hingeDownOverBottom_Y,
    handleTypeString,
  } = values;
  //Frame
  const frameWidth_X = +doorWidth_X.value;
  const frameHeight_Y = +doorHeight_Y.value;
  const frameLeft_X = getFrameLeft_X(frameWidth_X);
  const frameTop_Y = getFrameTop_Y(frameHeight_Y);
  const frameClearanceLeft_X = getFrameClearanceLeft_X(
    frameLeft_X,
    frameProfileWidth_X.value
  );
  const frameClearanceTop_Y = getFrameClearanceTop_Y(
    frameTop_Y,
    frameJumb_Y.value
  );
  const frameClearanceWidth_X = getFrameClearanceWidth_X(
    frameWidth_X,
    frameProfileWidth_X.value
  );
  const frameClearanceHeight_Y = getFrameClearanceHeight_Y(
    frameHeight_Y,
    thresholdHeight_Y.value,
    frameJumb_Y.value
  );

  const prepareFrames = () => {
    // pull view frame
    const frame = document.getElementById("frame");
    frame?.setAttribute("x", frameLeft_X.toString());
    frame?.setAttribute("y", frameTop_Y.toString());
    frame?.setAttribute("width", frameWidth_X.toString());
    frame?.setAttribute("height", frameHeight_Y.toString());
    frame?.setAttribute("mask", "url(#maskPort)");
    frame?.setAttribute("stroke", STROKE_COLOR);

    // push view frame is frame picture visible from push view
    const pushViewFrame = document.getElementById("pushViewFrame");
    pushViewFrame?.setAttribute("x", frameLeft_X.toString());
    pushViewFrame?.setAttribute("y", frameTop_Y.toString());
    pushViewFrame?.setAttribute("width", frameWidth_X.toString());
    pushViewFrame?.setAttribute("height", frameHeight_Y.toString());
    pushViewFrame?.setAttribute("mask", "url(#maskPort)");
    pushViewFrame?.setAttribute("stroke", STROKE_COLOR);
    pushViewFrame?.setAttribute("visibility", `${pushViewFrameVisibility}`);

    // frame outline contrast contur 3px
    const frameClearanceContur = document.getElementById("frameClearance");
    frameClearanceContur?.setAttribute("x", frameClearanceLeft_X.toString());
    frameClearanceContur?.setAttribute("y", frameClearanceTop_Y.toString());
    frameClearanceContur?.setAttribute(
      "width",
      frameClearanceWidth_X.toString()
    );
    frameClearanceContur?.setAttribute(
      "height",
      frameClearanceHeight_Y.toString()
    );
    frameClearanceContur?.setAttribute("mask", "url(#maskPort)");
    frameClearanceContur?.setAttribute("stroke", STROKE_COLOR);
    frameClearanceContur?.setAttribute("stroke-width", "3");

    // catch a frame outline for mask
    const portOutline = document.getElementById("portOutline");
    if (portOutline) {
      portOutline.setAttribute("x", frameLeft_X.toString());
      portOutline.setAttribute("y", frameTop_Y.toString());
      portOutline.setAttribute("width", frameWidth_X.toString());
      portOutline.setAttribute("height", frameHeight_Y.toString());
    }

    // catch a frame clearance for mask
    const portClearance = document.getElementById("portClearance");
    if (portClearance) {
      portClearance.setAttribute("x", frameClearanceLeft_X.toString());
      portClearance.setAttribute("y", frameClearanceTop_Y.toString());
      portClearance.setAttribute("width", frameClearanceWidth_X.toString());
      portClearance.setAttribute("height", frameClearanceHeight_Y.toString());
    }

    // frame  fill // url(#alumBrushedV)
    if (frameColor) {
      const color = colorsData.colors.filter(
        (color) => color.value === frameColor
      )[0].hex;
      frame?.setAttribute("fill", color);
      pushViewFrame?.setAttribute("fill", color);
    } else {
      frame?.setAttribute("fill", "#f1f0ea");
      pushViewFrame?.setAttribute("fill", "#f1f0ea");
    }
  };

  // wall behind

  // Doorleaf
  const isDoubleLeaf = leavesCount.value === "DoubleLeaf";

  const pictureLeafLeftWidth_X = getPictureLeafLeftWidth_X(
    isDoubleLeaf,
    frameWidth_X,
    openDirection.value,
    pullView,
    frameProfileWidthVisible_X.value,
    activeLeafWidth_X
  );

  const pictureLeafRightWidth_X = getPictureLeafRightWidth_X(
    frameWidth_X,
    pictureLeafLeftWidth_X,
    frameProfileWidthVisible_X.value
  );

  const leafHeight_Y = getLeafHeight_Y(
    frameHeight_Y,
    thresholdHeightVisible_Y.value,
    frameJumbVisible_Y.value
  );
  const pictureLeafLeft_X = getPictureLeafLeft_X(
    frameLeft_X,
    frameProfileWidthVisible_X.value
  );

  const pictureLeafRight_X = pullView
    ? getPictureLeafRight_X(pictureLeafLeft_X, pictureLeafLeftWidth_X)
    : getPictureLeafRight_X(pictureLeafLeft_X, pictureLeafLeftWidth_X);
  const leafTop_Y = getLeafTop_Y(frameTop_Y, frameJumbVisible_Y.value);

  const prepareLeafs = () => {
    /* catch  picture Leaf Left

      Looking from the perspective of pull door, it is the [LEFT] leaf of the door.
      Looking from opposite, it reflects the [RIGHT] leaf.
      Or only one leaf in any case.
     */

    const pictureLeafLeft = document.getElementById("picture_Leaf_Left");
    if (pictureLeafLeft) {
      pictureLeafLeft.setAttribute("x", pictureLeafLeft_X.toString());
      pictureLeafLeft.setAttribute("y", leafTop_Y.toString());
      pictureLeafLeft.setAttribute("width", pictureLeafLeftWidth_X.toString());
      pictureLeafLeft.setAttribute("height", leafHeight_Y.toString());
      pictureLeafLeft.setAttribute("fill", "url(#alumBrushedH)");
    }

    /* catch  picture Leaf Right
  
        Looking from the perspective of pull door, it is the [RIGHT] leaf of the door. 
        Looking from opposite, it reflects the [LEFT] leaf.
        It disappears if one leaf case.
       */
    const pictureLeafRight = document.getElementById("picture_Leaf_Right");
    if (pictureLeafRight) {
      pictureLeafRight.setAttribute("x", pictureLeafRight_X.toString());
      pictureLeafRight.setAttribute("y", leafTop_Y.toString());
      pictureLeafRight.setAttribute(
        "width",
        pictureLeafRightWidth_X.toString()
      );
      pictureLeafRight.setAttribute("height", leafHeight_Y.toString());
      pictureLeafRight.setAttribute("fill", "url(#alumBrushedH)");
    }
    // leafs  fill
    if (doorLeafColor) {
      const color = colorsData.colors.filter(
        (color) => color.value === doorLeafColor
      )[0].hex;
      pictureLeafLeft?.setAttribute("fill", color);
      pictureLeafRight?.setAttribute("fill", color);
    } else {
      pictureLeafLeft?.setAttribute("fill", "#f1f0ea");
      pictureLeafRight?.setAttribute("fill", "#f1f0ea");
    }
  };

  // Handles
  const handleData = getHandleData(
    openDirection.value,
    pullView,
    handleTypeString
  );
  const handle_Y = getHandle_Y(
    handleHeight_Y,
    openDirection.value,
    pullView,
    frameHeight_Y,
    handleTypeString
  );
  const handle_X = getHandle_X(
    openDirection.value,
    isDoubleLeaf,
    pictureLeafLeft_X,
    pictureLeafLeftWidth_X,
    pictureLeafRight_X,
    pictureLeafRightWidth_X,
    pullView,
    handleTypeString
  );

  const prepareHandle = () => {
    const HANDLE = document.querySelector('[text-rendering="HANDLE"]');
    HANDLE?.setAttribute("x", handle_X.toString());
    HANDLE?.setAttribute("y", handle_Y.toString());
  };

  // Hinges
  const hingeLeft_X = getHingeLeft_X(
    frameLeft_X,
    frameProfileWidthVisible_X.value
  );
  const hingeRight_X = getHingeRight_X(
    frameLeft_X,
    frameWidth_X,
    frameProfileWidthVisible_X.value
  );
  const hingeUp_Y = getHingeUp_Y(frameTop_Y, hingeUpUnderTop_Y.value);
  const hingeDown_Y = getHingeDown_Y(
    frameTop_Y,
    frameHeight_Y,
    hingeDownOverBottom_Y.value
  );
  const hingeMiddle_Y = getHingeMiddle_Y(
    frameTop_Y,
    frameHeight_Y,
    thirdHingePosition.value,
    hingeUpUnderTop_Y.value,
    hingeDownOverBottom_Y.value
  );
  const hingeLeftUpVisibility = getHingeLeftBaseVisibility(
    openDirection.value,
    leavesCount.value,
    pullView
  );
  const hingeLeftDownVisibility = getHingeLeftBaseVisibility(
    openDirection.value,
    leavesCount.value,
    pullView
  );
  const hingeRightUpVisibility = getHingeRightBaseVisibility(
    openDirection.value,
    leavesCount.value,
    pullView
  );
  const hingeRightDownVisibility = getHingeRightBaseVisibility(
    openDirection.value,
    leavesCount.value,
    pullView
  );
  const hingeLeftMiddleVisibility = getHingeLeftAdditionalVisibility(
    openDirection.value,
    leavesCount.value,
    hingesCount.value,
    pullView
  );
  const hingeRightMiddleVisibility = getHingeRightAdditionalVisibility(
    openDirection.value,
    leavesCount.value,
    hingesCount.value,
    pullView
  );

  const prepareHinges = () => {
    const Hinges = document.querySelectorAll('[text-rendering="HINGE"]');

    Hinges[0].setAttribute("id", "hingeLeftUp");
    Hinges[0].setAttribute("x", `${hingeLeft_X}`);
    Hinges[0].setAttribute("y", `${hingeUp_Y}`);
    Hinges[0].setAttribute("visibility", `${hingeLeftUpVisibility}`);

    Hinges[1].setAttribute("id", "hingeLeftDown");
    Hinges[1].setAttribute("x", `${hingeLeft_X}`);
    Hinges[1].setAttribute("y", `${hingeDown_Y}`);
    Hinges[1].setAttribute("visibility", `${hingeLeftDownVisibility}`);

    Hinges[2].setAttribute("id", "hingeRightUp");
    Hinges[2].setAttribute("x", `${hingeRight_X}`);
    Hinges[2].setAttribute("y", `${hingeUp_Y}`);
    Hinges[2].setAttribute("visibility", `${hingeRightUpVisibility}`);

    Hinges[3].setAttribute("id", "hingeRightDown");
    Hinges[3].setAttribute("x", `${hingeRight_X}`);
    Hinges[3].setAttribute("y", `${hingeDown_Y}`);
    Hinges[3].setAttribute("visibility", `${hingeRightDownVisibility}`);

    Hinges[4].setAttribute("id", "hingeLeftMiddle");
    Hinges[4].setAttribute("x", `${hingeLeft_X}`);
    Hinges[4].setAttribute("y", `${hingeMiddle_Y}`);
    Hinges[4].setAttribute("visibility", `${hingeLeftMiddleVisibility}`);

    Hinges[5].setAttribute("id", "hingeRightMiddle");
    Hinges[5].setAttribute("x", `${hingeRight_X}`);
    Hinges[5].setAttribute("y", `${hingeMiddle_Y}`);
    Hinges[5].setAttribute("visibility", `${hingeRightMiddleVisibility}`);
  };

  // DoorCloser
  const closerLeft_X =
    frameLeft_X + frameProfileWidthVisible_X.value + CLOSER_SHIFT_X;
  const closerRight_X =
    frameLeft_X + frameWidth_X - CLOSER_WIDTH_X - CLOSER_SHIFT_X;
  const closerTop_Y =
    frameTop_Y + frameProfileWidthVisible_X.value - CLOSER_SHIFT_Y;

  const prepareDoorCloser = () => {
    const CLOSER_LD = document.querySelector('[shape-rendering="CLOSER_LD"]');
    const CLOSER_LU = document.querySelector('[shape-rendering="CLOSER_LU"]');
    const CLOSER_RD = document.querySelector('[shape-rendering="CLOSER_RD"]');
    const CLOSER_RU = document.querySelector('[shape-rendering="CLOSER_RU"]');

    CLOSER_LD?.setAttribute("x", `${closerLeft_X}`);
    CLOSER_LD?.setAttribute("y", `${closerTop_Y}`);
    CLOSER_LU?.setAttribute("x", `${closerLeft_X}`);
    CLOSER_LU?.setAttribute("y", `${closerTop_Y}`);
    CLOSER_RD?.setAttribute("x", `${closerRight_X}`);
    CLOSER_RD?.setAttribute("y", `${closerTop_Y}`);
    CLOSER_RU?.setAttribute("x", `${closerRight_X}`);
    CLOSER_RU?.setAttribute("y", `${closerTop_Y}`);
    if (!useDoorCloser) {
      CLOSER_LD?.setAttribute("visibility", "hidden");
      CLOSER_LU?.setAttribute("visibility", "hidden");
      CLOSER_RD?.setAttribute("visibility", "hidden");
      CLOSER_RU?.setAttribute("visibility", "hidden");
    } else if (doorCloser === "OnHingeSide") {
      //only one visible
      CLOSER_LU?.setAttribute("visibility", "hidden");
      CLOSER_RD?.setAttribute("visibility", "hidden");
      CLOSER_RU?.setAttribute("visibility", "hidden");
    }
  };

  // Glazing
  const pullViewLeafLeft_Middle_X =
    pictureLeafLeft_X + pictureLeafLeftWidth_X / 2 - GLASING_CENTER_SHIFT_X;
  const pullViewLeafLeft_Middle_Y =
    leafTop_Y + leafHeight_Y - GLASING_CENTER_Y - GLASING_CENTER_SHIFT_Y;
  const pushViewFrameVisibility = pullView ? "hidden" : "visible";

  const prepareGlazing = () => {
   
    const GLASSES_ROUND_300_300 = document.querySelector('[shape-rendering="GLASSES_ROUND_300_300"]');
    GLASSES_ROUND_300_300?.setAttribute("id", "glasses_round_300_300");
    const GLASSES_SQUARE_300_300 = document.querySelector('[shape-rendering="GLASSES_SQUARE_300_300"]');
    GLASSES_SQUARE_300_300?.setAttribute("id", "glasses_square_300_300");

    GLASSES_ROUND_300_300?.setAttribute("x", `${pullViewLeafLeft_Middle_X}`);
    GLASSES_ROUND_300_300?.setAttribute("y", `${pullViewLeafLeft_Middle_Y}`);
    if (!useGlazing) {
      GLASSES_ROUND_300_300?.setAttribute("visibility", "hidden");
      GLASSES_SQUARE_300_300?.setAttribute("visibility", "hidden");
    } else if (GLASING_TYPE === "glasses_round_300_300") {
      //only one visible
      GLASSES_SQUARE_300_300?.setAttribute("visibility", "hidden");
    } else if (GLASING_TYPE === "glasses_square_300_300") {
      //only one visible
      GLASSES_ROUND_300_300?.setAttribute("visibility", "hidden");
    }
  };
  const prepareSVG = () => {
    const svg = document.getElementById("scene");
    const viewBoxWidth = `${
      add_10_Percents(frameWidth_X) > 1100
        ? add_10_Percents(frameWidth_X)
        : 1100
    }`;
    const viewBoxShift = 0;
    if (svg) {
      svg.setAttribute(
        "viewBox",
        `${viewBoxShift} 0 ${viewBoxWidth} ${add_10_Percents(frameHeight_Y)}`
      );
    }
  };
  const prepareRooler = () => {
    const Rooler = document.getElementById("rooler");
    if (Rooler) {
      Rooler.setAttribute(
        "x",
        `${
          add_10_Percents(frameWidth_X) > 1100
            ? add_10_Percents(frameWidth_X) / 2 - 500
            : 50
        }`
      );
    }
  };

  useEffect(() => {
    prepareSVG();
    prepareRooler();
    prepareFrames();
    prepareLeafs();
    prepareHinges();
    prepareHandle();
    prepareDoorCloser();
    prepareGlazing();
    // catch svg scene
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    prepareSVG();
    prepareRooler();
    prepareFrames();
    prepareLeafs();
    prepareHinges();
    prepareHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values,
    hingesCount,
    thirdHingePosition,
    pullView,
    frameColor,
    doorLeafColor,
  ]);

  const style = {
    width: "100%",
    height: "100%",
  };

  return (
    <div id="svgPlace" className="svgWrapper">
      <svg
        id="scene"
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        className="svgBody"
      >
        {/* <defs> order number is svg.children[0]*/}
        <defs>
          <pattern
            id="alumBrushedH"
            patternUnits="userSpaceOnUse"
            width="100%"
            height="100%"
          >
            <image
              href={ALUM_BRUSHED_H}
              x="0"
              y="0"
              width={"100%"}
              height={"100%"}
            />
          </pattern>
          <pattern
            id="alumBrushedV"
            patternUnits="userSpaceOnUse"
            width={"100%"}
            height={"100%"}
          >
            <image
              href={ALUM_BRUSHED_V}
              x="0"
              y="0"
              width="100%"
              height="100%"
            />
          </pattern>
        </defs>
        {/* rect#wall order number is svg.children[1]*/}
        <rect
          id="wall"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="#bbb0ce18"
        />
        {/* mask#maskPort order number is svg.children[2]*/}
        <mask id="maskPort">
          <rect id="portOutline" fill="white" />
          <rect id="portClearance" fill="black" />
        </mask>
        {/* rect#frame order number is svg.children[3]*/}
        <rect id="frame" fill="#7a51c217" stroke={STROKE_COLOR} />
        {/* rect#picture_Leaf_Left order number is svg.children[4]*/}
        <rect id="picture_Leaf_Left" fill="#51c27c16" stroke={STROKE_COLOR} />
        {/* rect#picture_Leaf_Right order number is svg.children[5]*/}
        <rect id="picture_Leaf_Right" fill="#519ec215" stroke={STROKE_COLOR} />
        {/* svg#Handle order number is svg.children[6]*/}
        {handleData.handleType === "square_R" && <HANDLE_SQUARE_R_X26_Y26 />}
        {handleData.handleType === "square_L" && <HANDLE_SQUARE_L_X118_Y26 />}
        {handleData.handleType === "round_L" && <HANDLE_ROUND_L_X117_Y25 />}
        {handleData.handleType === "round_R" && <HANDLE_ROUND_R_X25_Y25 />}
        {handleData.handleType === "long_L" && <HANDLE_LONG_L_X118_Y_MIN_26 />}
        {handleData.handleType === "long_R" && <HANDLE_LONG_R_X16_Y_MIN_26 />}
        {/* svg#Hinge order number is svg.children[7-12]*/}
        <HINGE_18_132 />
        <HINGE_18_132 />
        <HINGE_18_132 />
        <HINGE_18_132 />
        <HINGE_18_132 />
        <HINGE_18_132 />
        {/* rect#pushViewFrame in case push view order number is svg.children[13-14]*/}
        <rect
          id="pushViewFrame"
          fill="#7a51c217"
          stroke={STROKE_COLOR}
          visibility={pushViewFrameVisibility}
        />

        <rect
          id="frameClearance"
          stroke={STROKE_COLOR}
          visibility={pushViewFrameVisibility}
        />

        {/* svg#Closer order number is svg.children[15-18]*/}
        <CLOSER_LD />
        <CLOSER_LU />
        <CLOSER_RD />
        <CLOSER_RU />
        {/* svg#Glasse order number is svg.children[19-20]*/}
        <GLASSES_ROUND_300_300 />
        <GLASSES_SQUARE_300_300 />
        <Rooler />
      </svg>
      <div
        onMouseEnter={handleHoverPullView}
        onMouseLeave={handleHoverPullView}
      >
        {pullView && "hover me to see PUSH view"}
        {!pullView && "leave me to see PULL view"}
      </div>
    </div>
  );
};

export default StellDoorVisualizer;
