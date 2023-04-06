import React, { useEffect, useState } from "react";
import { ReactComponent as Closer_LD } from "../images/Closer_LD.svg";
import { ReactComponent as Closer_LU } from "../images/Closer_LU.svg";
import { ReactComponent as Closer_R_D } from "../images/Closer_R_D.svg";
import { ReactComponent as Closer_R_U } from "../images/Closer_R_U.svg";
import { ReactComponent as Glasses_round_300_300 } from "../images/Glasses_round_300_300.svg";
import { ReactComponent as Glasses_square_300_300 } from "../images/Glasses_square_300_300.svg";
import { ReactComponent as Handle_long_L_x118_y76 } from "../images/Handle_long_L_x118_y76.svg";
import { ReactComponent as Handle_long_R_x16_y76 } from "../images/Handle_long_R_x16_y76.svg";
import { ReactComponent as Handle_round_L_x117_y25 } from "../images/Handle_round_L_x117_y25.svg";
import { ReactComponent as Handle_round_R_x25_y25 } from "../images/Handle_round_R_x25_y25.svg";
import { ReactComponent as Handle_square_L_x118_y26 } from "../images/Handle_square_L_x118_y26.svg";
import { ReactComponent as Handle_square_R_x26_y26 } from "../images/Handle_square_R_x26_y26.svg";
import { ReactComponent as Hinge_18_132 } from "../images/Hinge_18_132.svg";
import alum_brushed_H from "../images/alum_brushed_H.png";
import alum_brushed_V from "../images/alum_brushed_V.png";
import colorsData from "../colorsRal.json";
import "./StellDoorVisualizer.css";
import {
  CLOSER_SHIFT_X,
  CLOSER_SHIFT_Y,
  CLOSER_WIDTH_X,
  FRAME_PROFILE_WIDTH_VISIBLE_X,
  GLASING_CENTER_SHIFT_X,
  GLASING_CENTER_SHIFT_Y,
  GLASING_CENTER_Y,
  GLASING_TYPE,
  // PATTERN_IMAGE_HEIGHT_Y,
  // PATTERN_IMAGE_WIDTH_X,
  // SHIFT_VIEWPORT_Y,
  STROKE_COLOR,
  // VISIBLE_WALL_HEIGHT_Y,
  // VISIBLE_WALL_WIDTH_X,
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

const StellDoorVisualizer = ({ values }: any) => {
  const [pullView, setPullView] = useState(true);
  const handleHoverPullView = () => {
    setPullView(!pullView);
  };
  const {
    dimensions: {
      doorSize: { width, height },
    },
    leavesCount,
    dinDirection,
    hingesCount,
    useGlazing,
    useDoorCloser,
    doorCloser,
    thirdHingePosition,
    handleHeight,
    frameColor,
    doorLeafColor,
  } = values;

  //Frame
  const frameWidth_X = +width;
  const frameHeight_Y = +height;
  const frameLeft_X = getFrameLeft_X(frameWidth_X);
  const frameTop_Y = getFrameTop_Y(frameHeight_Y);
  const frameClearanceLeft_X = getFrameClearanceLeft_X(frameLeft_X);
  const frameClearanceTop_Y = getFrameClearanceTop_Y(frameTop_Y);
  const frameClearanceWidth_X = getFrameClearanceWidth_X(frameWidth_X);
  const frameClearanceHeight_Y = getFrameClearanceHeight_Y(frameHeight_Y);

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
  const isDoubleLeaf = leavesCount === "DoubleLeaf";

  const pictureLeafLeftWidth_X = getPictureLeafLeftWidth_X(
    isDoubleLeaf,
    frameWidth_X,
    dinDirection,
    pullView
  );

  const pictureLeafRightWidth_X = getPictureLeafRightWidth_X(
    frameWidth_X,
    pictureLeafLeftWidth_X
  );

  const leafHeight_Y = getLeafHeight_Y(frameHeight_Y);
  const pictureLeafLeft_X = getPictureLeafLeft_X(frameLeft_X);

  const pictureLeafRight_X = pullView
    ? getPictureLeafRight_X(pictureLeafLeft_X, pictureLeafLeftWidth_X)
    : getPictureLeafRight_X(pictureLeafLeft_X, pictureLeafLeftWidth_X);
  const leafTop_Y = getLeafTop_Y(frameTop_Y);

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
  const handleData = getHandleData(dinDirection, pullView);
  const handle_Y = getHandle_Y(
    handleHeight,
    dinDirection,
    pullView,
    frameHeight_Y
  );
  const handle_X = getHandle_X(
    dinDirection,
    isDoubleLeaf,
    pictureLeafLeft_X,
    pictureLeafLeftWidth_X,
    pictureLeafRight_X,
    pictureLeafRightWidth_X,
    pullView
  );

  const prepareHandle = () => {
    const svg = document.getElementById("scene");
    const handle = svg?.children[6];
    handle?.setAttribute("id", "Handle");
    handle?.setAttribute("x", handle_X.toString());
    handle?.setAttribute("y", handle_Y.toString());
  };

  // Hinges
  const hingeLeft_X = getHingeLeft_X(frameLeft_X);
  const hingeRight_X = getHingeRight_X(frameLeft_X, frameWidth_X);
  const hingeUp_Y = getHingeUp_Y(frameTop_Y);
  const hingeDown_Y = getHingeDown_Y(frameTop_Y, frameHeight_Y);
  const hingeMiddle_Y = getHingeMiddle_Y(
    frameTop_Y,
    frameHeight_Y,
    thirdHingePosition
  );
  const hingeLeftUpVisibility = getHingeLeftBaseVisibility(
    dinDirection,
    leavesCount,
    pullView
  );
  const hingeLeftDownVisibility = getHingeLeftBaseVisibility(
    dinDirection,
    leavesCount,
    pullView
  );
  const hingeRightUpVisibility = getHingeRightBaseVisibility(
    dinDirection,
    leavesCount,
    pullView
  );
  const hingeRightDownVisibility = getHingeRightBaseVisibility(
    dinDirection,
    leavesCount,
    pullView
  );
  const hingeLeftMiddleVisibility = getHingeLeftAdditionalVisibility(
    dinDirection,
    leavesCount,
    hingesCount,
    pullView
  );
  const hingeRightMiddleVisibility = getHingeRightAdditionalVisibility(
    dinDirection,
    leavesCount,
    hingesCount,
    pullView
  );

  const prepareHinges = () => {
    const svg = document.getElementById("scene");
    const hingeLeftUp = svg?.children[7];
    hingeLeftUp?.setAttribute("id", "hingeLeftUp");
    const hingeLeftDown = svg?.children[8];
    hingeLeftDown?.setAttribute("id", "hingeLeftDown");
    const hingeRightUp = svg?.children[9];
    hingeRightUp?.setAttribute("id", "hingeRightUp");
    const hingeRightDown = svg?.children[10];
    hingeRightDown?.setAttribute("id", "hingeRightDown");
    const hingeLeftMiddle = svg?.children[11];
    hingeLeftMiddle?.setAttribute("id", "hingeLeftMiddle");
    const hingeRightMiddle = svg?.children[12];
    hingeRightMiddle?.setAttribute("id", "hingeRightMiddle");

    hingeLeftUp?.setAttribute("x", `${hingeLeft_X}`);
    hingeLeftUp?.setAttribute("y", `${hingeUp_Y}`);
    hingeLeftUp?.setAttribute("visibility", `${hingeLeftUpVisibility}`);
    hingeLeftDown?.setAttribute("x", `${hingeLeft_X}`);
    hingeLeftDown?.setAttribute("y", `${hingeDown_Y}`);
    hingeLeftDown?.setAttribute("visibility", `${hingeLeftDownVisibility}`);
    hingeRightUp?.setAttribute("x", `${hingeRight_X}`);
    hingeRightUp?.setAttribute("y", `${hingeUp_Y}`);
    hingeRightUp?.setAttribute("visibility", `${hingeRightUpVisibility}`);
    hingeRightDown?.setAttribute("x", `${hingeRight_X}`);
    hingeRightDown?.setAttribute("y", `${hingeDown_Y}`);
    hingeRightDown?.setAttribute("visibility", `${hingeRightDownVisibility}`);
    hingeLeftMiddle?.setAttribute("x", `${hingeLeft_X}`);
    hingeLeftMiddle?.setAttribute("y", `${hingeMiddle_Y}`);
    hingeLeftMiddle?.setAttribute("visibility", `${hingeLeftMiddleVisibility}`);
    hingeRightMiddle?.setAttribute("x", `${hingeRight_X}`);
    hingeRightMiddle?.setAttribute("y", `${hingeMiddle_Y}`);
    hingeRightMiddle?.setAttribute(
      "visibility",
      `${hingeRightMiddleVisibility}`
    );
  };

  // DoorCloser
  const closerLeft_X =
    frameLeft_X + FRAME_PROFILE_WIDTH_VISIBLE_X + CLOSER_SHIFT_X;
  const closerRight_X =
    frameLeft_X + frameWidth_X - CLOSER_WIDTH_X - CLOSER_SHIFT_X;
  const closerTop_Y =
    frameTop_Y + FRAME_PROFILE_WIDTH_VISIBLE_X - CLOSER_SHIFT_Y;

  const prepareDoorCloser = () => {
    const svg = document.getElementById("scene");
    const closer_LD = svg?.children[15];
    closer_LD?.setAttribute("id", "closer_LD");
    const closer_LU = svg?.children[16];
    closer_LU?.setAttribute("id", "closer_LU");
    const closer_R_D = svg?.children[17];
    closer_R_D?.setAttribute("id", "closer_R_D");
    const closer_R_U = svg?.children[18];
    closer_R_U?.setAttribute("id", "closer_R_U");

    closer_LD?.setAttribute("x", `${closerLeft_X}`);
    closer_LD?.setAttribute("y", `${closerTop_Y}`);
    closer_LU?.setAttribute("x", `${closerLeft_X}`);
    closer_LU?.setAttribute("y", `${closerTop_Y}`);
    closer_R_D?.setAttribute("x", `${closerRight_X}`);
    closer_R_D?.setAttribute("y", `${closerTop_Y}`);
    closer_R_U?.setAttribute("x", `${closerRight_X}`);
    closer_R_U?.setAttribute("y", `${closerTop_Y}`);
    if (!useDoorCloser) {
      closer_LD?.setAttribute("visibility", "hidden");
      closer_LU?.setAttribute("visibility", "hidden");
      closer_R_D?.setAttribute("visibility", "hidden");
      closer_R_U?.setAttribute("visibility", "hidden");
    } else if (doorCloser === "OnHingeSide") {
      //only one visible
      closer_LU?.setAttribute("visibility", "hidden");
      closer_R_D?.setAttribute("visibility", "hidden");
      closer_R_U?.setAttribute("visibility", "hidden");
    }
  };

  // Glazing
  const pullViewLeafLeft_Middle_X =
    pictureLeafLeft_X + pictureLeafLeftWidth_X / 2 - GLASING_CENTER_SHIFT_X;
  const pullViewLeafLeft_Middle_Y =
    leafTop_Y + leafHeight_Y - GLASING_CENTER_Y - GLASING_CENTER_SHIFT_Y;
  const pushViewFrameVisibility = pullView ? "hidden" : "visible";

  const prepareGlazing = () => {
    const svg = document.getElementById("scene");
    const glasses_round_300_300 = svg?.children[19];
    glasses_round_300_300?.setAttribute("id", "glasses_round_300_300");
    const glasses_square_300_300 = svg?.children[20];
    glasses_square_300_300?.setAttribute("id", "glasses_square_300_300");

    glasses_round_300_300?.setAttribute("x", `${pullViewLeafLeft_Middle_X}`);
    glasses_round_300_300?.setAttribute("y", `${pullViewLeafLeft_Middle_Y}`);
    if (!useGlazing) {
      glasses_round_300_300?.setAttribute("visibility", "hidden");
      glasses_square_300_300?.setAttribute("visibility", "hidden");
    } else if (GLASING_TYPE === "glasses_round_300_300") {
      //only one visible
      glasses_square_300_300?.setAttribute("visibility", "hidden");
    } else if (GLASING_TYPE === "glasses_square_300_300") {
      //only one visible
      glasses_round_300_300?.setAttribute("visibility", "hidden");
    }
  };

  useEffect(() => {
    const svg = document.getElementById("scene");
    if (svg) {
      svg.setAttribute(
        "viewBox",
        `0 0 ${add_10_Percents(frameWidth_X)} ${add_10_Percents(frameHeight_Y)}`
      );
      // svg.setAttribute(
      //   'viewBox',
      //   `0 ${SHIFT_VIEWPORT_Y} ${VISIBLE_WALL_WIDTH_X} ${VISIBLE_WALL_HEIGHT_Y}`,
      // );
    }

    prepareFrames();
    prepareLeafs();
    prepareHinges();
    prepareHandle();
    prepareDoorCloser();
    prepareGlazing();
    // catch svg scene
  }, []);

  useEffect(() => {
    prepareFrames();
    prepareLeafs();
    prepareHinges();
    prepareHandle();
  }, [hingesCount, thirdHingePosition, pullView, frameColor, doorLeafColor]);

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
              href={alum_brushed_H}
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
              href={alum_brushed_V}
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
        {handleData.handleType === "square_R" && <Handle_square_R_x26_y26 />}
        {handleData.handleType === "square_L" && <Handle_square_L_x118_y26 />}
        {handleData.handleType === "round_L" && <Handle_round_L_x117_y25 />}
        {handleData.handleType === "round_R" && <Handle_round_R_x25_y25 />}
        {handleData.handleType === "long_L" && <Handle_long_L_x118_y76 />}
        {handleData.handleType === "long_R" && <Handle_long_R_x16_y76 />}
        {/* svg#Hinge order number is svg.children[7-12]*/}
        <Hinge_18_132 />
        <Hinge_18_132 />
        <Hinge_18_132 />
        <Hinge_18_132 />
        <Hinge_18_132 />
        <Hinge_18_132 />
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
        <Closer_LD />
        <Closer_LU />
        <Closer_R_D />
        <Closer_R_U />
        {/* svg#Glasse order number is svg.children[19-20]*/}
        <Glasses_round_300_300 />
        <Glasses_square_300_300 />
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