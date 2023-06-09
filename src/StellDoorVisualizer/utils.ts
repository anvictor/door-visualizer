import { ActiveLeafType, HandleFunctions, ValuesType } from "../types";
/**
 * The image of the door is made SVG in layers.
The list of important layers from the bottom - the furthest from the viewer.
First Frame with hole.
The first Pull-View side Leaf Left
The second Pull-View side Leaf Right
Door Hinges
Door handles
Second Frame with hole again *
Door closers

In case it is necessary to depict the view from the push side, we include the visibility of the near second frame and this overlaps part of the visibility of the door leaves without the need to redraw the dimensions of the leaves.

Important! View from Push side left visible frame depict not left but right leaf.

In the case when only one sheet is used, it is always depicted by the first sheet regardless of open direction of active leaf.

In case reorder or add or remove layers change indexation.
 */
const ACTIVE_TO_PASSIVE_LEAF_OVERLAP = 40;
const CLOSER_SHIFT_INSIDE_Y = 39;
const CLOSER_SHIFT_OUTSIDE_Y = 95;
const CLOSER_SHIFT_X = 10;
const CLOSER_WIDTH_X = 610;
const DOOR_HEIGHT_INFLUENT = 1100;
const DOOR_HEIGHT_INFLUENT_HANDLE_MIN_Y = 1100;
const DOOR_HEIGHT_INFLUENT_HINGE_MIN_Y = 1201;
const DOOR_HEIGHT_INFLUENT_MAX_Y = 700;
const DOOR_HEIGHT_MAX_Y = 3000;
const DOOR_HEIGHT_MIN_Y = 900;
const DOOR_HEIGHT_Y = 2200;
const DOOR_WIDTH_MAX_FOR_DOUBLE_X = 1800;
const DOOR_WIDTH_MAX_X = 2800;
const DOOR_WIDTH_MIN_FOR_DOUBLE_X = 1000;
const DOOR_WIDTH_MIN_X = 700;
const DOOR_WIDTH_X = 920;
const FRAME_JUMB_VISIBLE_Y = 15;
const FRAME_JUMB_X = 50;
const FRAME_MAX = 70;
const FRAME_MIN = 30;
const FRAME_PROFILE_WIDTH_VISIBLE_X = 40;
const FRAME_PROFILE_WIDTH_X = 70;
const GLAZING_CENTER_SHIFT_X = 150;
const GLAZING_CENTER_SHIFT_Y = 150;
const GLAZING_CENTER_Y = 1780;
const GLAZING_TYPE = "no"; // ["Square", "Round", "no"]
const HANDLE_AXIS_RELATIVE_SHIFT_X = new Map();
HANDLE_AXIS_RELATIVE_SHIFT_X.set("long_L", { X: 118, Y: -26 });
HANDLE_AXIS_RELATIVE_SHIFT_X.set("long_R", { X: 16, Y: -26 });
HANDLE_AXIS_RELATIVE_SHIFT_X.set("round_L", { X: 117, Y: 25 });
HANDLE_AXIS_RELATIVE_SHIFT_X.set("round_R", { X: 25, Y: 25 });
HANDLE_AXIS_RELATIVE_SHIFT_X.set("square_L", { X: 118, Y: 26 });
HANDLE_AXIS_RELATIVE_SHIFT_X.set("square_R", { X: 26, Y: 26 });
const HANDLE_TYPE = "square"; // ["square", "round", "long"]
const HINGE_DOWN_OVER_BOTTOM_MAX_Y = 500;
const HINGE_DOWN_OVER_BOTTOM_MIN_Y = 100;
const HINGE_DOWN_OVER_BOTTOM_Y = 400;
const HINGE_HEIGHT_Y = 132;
const HINGE_UP_UNDER_TOP_MAX_Y = 200;
const HINGE_UP_UNDER_TOP_MIN_Y = 0;
const HINGE_UP_UNDER_TOP_Y = 150;
const HINGE_WIDTH_X = 18;
const LEAF_MIN = 250;
const LEAF_WIDTH_MIN_FOR_CLOSER_X = 500;
const LOCK_SHIFT_X = 50;
const STROKE_COLOR = "black";
const THRESH_HOLD_HEIGHT_MIN_Y = 0;
const THRESH_HOLD_HEIGHT_VISIBLE_Y = 5;
const THRESH_HOLD_HEIGHT_Y = 55;

const values: ValuesType = {
  activeLeafWidth_X: {
    type: "number",
    displayName: "Number in mm",
    min: 250,
    max: 1500,
    value: 600,
  },
  activeLeafWidthOptions: [
    { value: "exactlyHalf", displayName: "Exactly Half" },
    { value: "number", displayName: "Number in mm" },
  ],
  openDirection: { value: "Left", displayName: "Left hand pull" }, // "Left", "Right"
  closerMountedPosition: { value: "Inside", displayName: "Inside" }, //'Inside', 'Outside'
  doorLeafColor: "",
  frameColor: "",
  frameJumb_Y: {
    min: FRAME_MIN,
    max: FRAME_MAX,
    value: FRAME_JUMB_X,
  },
  frameJumbVisible_Y: {
    min: FRAME_MIN,
    max: FRAME_MAX,
    value: FRAME_JUMB_VISIBLE_Y,
  }, // 15,
  frameProfileWidth_X: {
    min: FRAME_MIN,
    max: FRAME_MAX,
    value: FRAME_PROFILE_WIDTH_X,
  },
  frameProfileWidthVisible_X: {
    min: FRAME_MIN,
    max: FRAME_MAX,
    value: FRAME_PROFILE_WIDTH_VISIBLE_X,
  },
  handleHeight_Y: "1050",
  hingesCount: {
    value: "TwoPieces",
    displayName: "Two Pieces",
  }, // "TwoPieces", "ThreePieces"
  doorHeight_Y: {
    min: DOOR_HEIGHT_MIN_Y,
    max: DOOR_HEIGHT_MAX_Y,
    value: DOOR_HEIGHT_Y,
  },
  doorWidth_X: {
    min: DOOR_WIDTH_MIN_X,
    max: DOOR_WIDTH_MAX_X,
    value: DOOR_WIDTH_X,
  },
  leavesCount: { value: "SingleLeaf", displayName: "Single Leaf" }, //"DoubleLeaf","SingleLeaf"
  thirdHingePosition: { value: "Betwen", displayName: "Betwen" }, //"Size500mmUnderTheTop", "Betwen"
  thresholdHeight_Y: {
    min: THRESH_HOLD_HEIGHT_MIN_Y,
    max: FRAME_MAX,
    value: THRESH_HOLD_HEIGHT_Y,
  },
  thresholdHeightVisible_Y: {
    min: THRESH_HOLD_HEIGHT_MIN_Y,
    max: FRAME_MAX,
    value: THRESH_HOLD_HEIGHT_VISIBLE_Y,
  },
  useDoorCloser: false,
  useSecondCloser: false,
  useGlazing: false,
  hingeUpUnderTop_Y: {
    min: HINGE_UP_UNDER_TOP_MAX_Y,
    max: HINGE_UP_UNDER_TOP_MIN_Y,
    value: HINGE_UP_UNDER_TOP_Y,
  },
  hingeDownOverBottom_Y: {
    min: HINGE_DOWN_OVER_BOTTOM_MIN_Y,
    max: HINGE_DOWN_OVER_BOTTOM_MAX_Y,
    value: HINGE_DOWN_OVER_BOTTOM_Y,
  },
  handleTypeString: HANDLE_TYPE,
  glazingType: {
    value: GLAZING_TYPE,
    displayName: GLAZING_TYPE,
  },
  leafWidthMinForDouble_X: DOOR_WIDTH_MIN_FOR_DOUBLE_X,
  leafWidthMaxForDouble_X: DOOR_WIDTH_MAX_FOR_DOUBLE_X,
  leafWidthMinForCloser_X: LEAF_WIDTH_MIN_FOR_CLOSER_X,
  doorHeightInfluentMax_Y: DOOR_HEIGHT_INFLUENT_MAX_Y,
  doorHeightInfluentHingeMin_Y: DOOR_HEIGHT_INFLUENT_HINGE_MIN_Y,
  doorHeightInfluentHandleMin_Y: DOOR_HEIGHT_INFLUENT_HANDLE_MIN_Y,
  doorHeightInfluent_Y: DOOR_HEIGHT_INFLUENT,
};

const add_10_Percents = (value: number) => +value + +value / 10;

const getFrameLeft_X = (frameWidth_X: number) => {
  const frameLeft =
    add_10_Percents(frameWidth_X) > 1100
      ? (add_10_Percents(frameWidth_X) - frameWidth_X) / 2
      : (1100 - frameWidth_X) / 2;
  return frameLeft;
};

const getFrameTop_Y = (frameHeight_Y: number) => {
  return add_10_Percents(+frameHeight_Y) - +frameHeight_Y;
};

const getFrameClearanceLeft_X = (
  frameLeft_X: number,
  frameProfileWidth_X: number
) => {
  return +frameLeft_X + frameProfileWidth_X;
};

const getFrameClearanceTop_Y = (frameTop_Y: number, frameJumb_Y: number) => {
  return +frameTop_Y + frameJumb_Y;
};

const getFrameClearanceWidth_X = (
  frameWidth_X: number,
  frameProfileWidth_X: number
) => {
  return +frameWidth_X - frameProfileWidth_X * 2;
};

const getFrameClearanceHeight_Y = (
  frameHeight_Y: number,
  treshHoldHeight_Y: number,
  frameJumb_Y: number
) => {
  return +frameHeight_Y - frameJumb_Y - treshHoldHeight_Y;
};

const getPictureLeafLeftWidth_X = (
  isDoubleLeaf: boolean,
  frameWidth_X: number,
  openDirection: string,
  pullView: boolean,
  frameProfileWidthVisible_X: number,
  activeLeafWidth_X: ActiveLeafType
) => {
  let pictureLeafLeftWidth_X = 200;

  const isExactlyHalf = activeLeafWidth_X.type === "exactlyHalf";
  const indexLogicLeafLeftWidth =
    1000 * Number(isExactlyHalf) +
    100 * Number(pullView) +
    10 * Number(isDoubleLeaf) +
    Number(openDirection === "Left");

  switch (indexLogicLeafLeftWidth) {
    case 0:
    case 1:
    case 100:
    case 101:
    case 1000:
    case 1001:
    case 1100:
    case 1101:
      pictureLeafLeftWidth_X = frameWidth_X - frameProfileWidthVisible_X * 2;
      break;
    case 10:
      pictureLeafLeftWidth_X =
        activeLeafWidth_X.value - ACTIVE_TO_PASSIVE_LEAF_OVERLAP;
      break;
    case 11:
      pictureLeafLeftWidth_X =
        frameWidth_X -
        frameProfileWidthVisible_X * 2 -
        activeLeafWidth_X.value +
        ACTIVE_TO_PASSIVE_LEAF_OVERLAP;
      break;
    case 110:
      pictureLeafLeftWidth_X =
        frameWidth_X - frameProfileWidthVisible_X * 2 - activeLeafWidth_X.value;
      break;
    case 111:
      pictureLeafLeftWidth_X = activeLeafWidth_X.value;
      break;
    case 1010:
      pictureLeafLeftWidth_X =
        (frameWidth_X - frameProfileWidthVisible_X * 2) / 2 -
        ACTIVE_TO_PASSIVE_LEAF_OVERLAP;
      break;
    case 1011:
      pictureLeafLeftWidth_X =
        (frameWidth_X - frameProfileWidthVisible_X * 2) / 2 +
        ACTIVE_TO_PASSIVE_LEAF_OVERLAP;
      break;
    case 1110:
    case 1111:
      pictureLeafLeftWidth_X =
        (frameWidth_X - frameProfileWidthVisible_X * 2) / 2;
      break;
    default:
      break;
  }

  return pictureLeafLeftWidth_X;
};

const getPictureLeafRightWidth_X = (
  frameWidth_X: number,
  pullViewLeafLeftWidth_X: number,
  frameProfileWidthVisible_X: number
) => {
  return (
    +frameWidth_X - frameProfileWidthVisible_X * 2 - +pullViewLeafLeftWidth_X
  );
};

const getLeafHeight_Y = (
  frameHeight_Y: number,
  treshHoldHeightVisible_Y: number,
  frameJumbVisible_Y: number
) => {
  return +frameHeight_Y - frameJumbVisible_Y - treshHoldHeightVisible_Y;
};

const getPictureLeafLeft_X = (
  frameLeft: number,
  frameProfileWidthVisible_X: number
) => {
  return +frameLeft + frameProfileWidthVisible_X;
};

const getPictureLeafRight_X = (
  pullViewLeafLeft_X: number,
  pullViewLeafLeftWidth_X: number
) => {
  return pullViewLeafLeft_X + pullViewLeafLeftWidth_X;
};

const getLeafTop_Y = (frameTop_Y: number, frameJumbVisible_Y: number) => {
  return +frameTop_Y + frameJumbVisible_Y;
};

const getHandle_Y = (
  handleHeight: string,
  openDirection: string,
  pullView: boolean,
  frameHeight_Y: number,
  handleTypeString: string
) => {
  const handleAxisDescent_Y = getHandleData(
    openDirection,
    pullView,
    handleTypeString
  ).HandleAxisRelativeShift.Y;
  return add_10_Percents(+frameHeight_Y) - +handleHeight + handleAxisDescent_Y;
};

const getHandle_X = (
  openDirection: string,
  isDoubleLeaf: boolean,
  pictureLeafRight_X: number,
  doorWidth_X: number,
  frameProfileWidth_X: number,
  pullView: boolean,
  handleTypeString: string
) => {
  let handle_X = 0;
  /*
    PULL? Double? Left? 
    0 0 0      push_&_single_&_right  *    
    0 0 1      push_&_single_&_left  *  
    0 1 0      push_&_double_&_right   *   
    0 1 1      push_&_double_&_left  *      
    1 0 0      pull_&_single_&_right      * 
    1 0 1      pull_&_left       * 
    1 1 0      pull_&_double_&_right        
    1 1 1      pull_&_left   *
   */

  const handleTypes: { [key: string]: string } = {
    0: "push_&_single_&_right",
    10: "push_&_double_&_right",
    1: "push_&_single_&_left",
    11: "push_&_double_&_left",
    100: "pull_&_single_&_right",
    101: "pull_&_left",
    110: "pull_&_double_&_right",
    111: "pull_&_left",
  };

  const indexLogicHandle_X =
    100 * Number(pullView) +
    10 * Number(isDoubleLeaf) +
    Number(openDirection === "Left");

  const indexPictureHandle_X = handleTypes[indexLogicHandle_X.toString()] ?? "";

  const handleAxisShift_X = getHandleData(
    openDirection,
    pullView,
    handleTypeString
  ).HandleAxisRelativeShift.X;

  const handleCalculations: HandleFunctions = {
    "push_&_single_&_right": () =>
      getFrameClearanceLeft_X(
        getFrameLeft_X(doorWidth_X),
        frameProfileWidth_X
      ) +
      getFrameClearanceWidth_X(doorWidth_X, frameProfileWidth_X) -
      handleAxisShift_X -
      LOCK_SHIFT_X,
    "push_&_single_&_left": () =>
      getFrameClearanceLeft_X(
        getFrameLeft_X(doorWidth_X),
        frameProfileWidth_X
      ) +
      LOCK_SHIFT_X -
      handleAxisShift_X,
    "push_&_double_&_right": () =>
      pictureLeafRight_X - handleAxisShift_X - LOCK_SHIFT_X,
    "push_&_double_&_left": () =>
      pictureLeafRight_X + LOCK_SHIFT_X - handleAxisShift_X,
    "pull_&_single_&_right": () =>
      getFrameClearanceLeft_X(
        getFrameLeft_X(doorWidth_X),
        frameProfileWidth_X
      ) +
      LOCK_SHIFT_X -
      handleAxisShift_X,
    "pull_&_left": () =>
      pictureLeafRight_X -
      ACTIVE_TO_PASSIVE_LEAF_OVERLAP -
      LOCK_SHIFT_X -
      handleAxisShift_X,
    "pull_&_double_&_right": () =>
      pictureLeafRight_X +
      ACTIVE_TO_PASSIVE_LEAF_OVERLAP +
      LOCK_SHIFT_X -
      handleAxisShift_X,
  };

  const handlePositionCalculation = handleCalculations[indexPictureHandle_X];

  if (handlePositionCalculation) {
    handle_X = handlePositionCalculation();
  } else {
    // handle unknown handle type string
  }

  return handle_X;
};

const getHingeLeft_X = (
  frameLeft_X: number,
  frameProfileWidthVisible_X: number
) => {
  return +frameLeft_X + frameProfileWidthVisible_X - HINGE_WIDTH_X;
};

const getHingeRight_X = (
  frameLeft_X: number,
  frameWidth_X: number,
  frameProfileWidthVisible_X: number
) => {
  return +frameLeft_X + +frameWidth_X - frameProfileWidthVisible_X;
};

const getHingeUp_Y = (frameTop_Y: number, hingeUpUnderTop_Y: number) => {
  return +frameTop_Y + hingeUpUnderTop_Y;
};

const getHingeDown_Y = (
  frameTop_Y: number,
  frameHeight_Y: number,
  hingeDownOverBottom_Y: number
) => {
  return +frameTop_Y + +frameHeight_Y - hingeDownOverBottom_Y - HINGE_HEIGHT_Y;
};

const getHingeMiddle_Y = (
  frameTop_Y: number,
  frameHeight_Y: number,
  thirdHingePosition: string,
  hingeUpUnderTop_Y: number,
  hingeDownOverBottom_Y: number
) => {
  if (thirdHingePosition === "Size500mmUnderTheTop") {
    return +frameTop_Y + 500;
  }
  // else return Y centered betwen two other hinges

  return (
    (getHingeUp_Y(frameTop_Y, hingeUpUnderTop_Y) +
      getHingeDown_Y(frameTop_Y, frameHeight_Y, hingeDownOverBottom_Y)) /
    2
  );
};

const getHingeLeftBaseVisibility = (
  openDirection: string,
  leavesCount: string,
  pullView: boolean
) => {
  let LeftBaseVisibility = true;
  if (!pullView) {
    LeftBaseVisibility = false;
  }
  if (openDirection === "Right" && leavesCount === "SingleLeaf") {
    LeftBaseVisibility = false;
  }

  return LeftBaseVisibility ? "visible" : "hidden";
};

const getHingeRightBaseVisibility = (
  openDirection: string,
  leavesCount: string,
  pullView: boolean
) => {
  let RightBaseVisibility = true;
  if (!pullView) {
    RightBaseVisibility = false;
  }
  if (openDirection === "Left" && leavesCount === "SingleLeaf") {
    RightBaseVisibility = false;
  }

  return RightBaseVisibility ? "visible" : "hidden";
};

const getHingeLeftAdditionalVisibility = (
  openDirection: string,
  leavesCount: string,
  hingesCount: string,
  pullView: boolean
) => {
  let LeftBaseVisibility = true;
  if (!pullView || hingesCount === "TwoPieces") {
    LeftBaseVisibility = false;
  }
  if (openDirection === "Right" && leavesCount === "SingleLeaf") {
    LeftBaseVisibility = false;
  }

  return LeftBaseVisibility ? "visible" : "hidden";
};

const getHingeRightAdditionalVisibility = (
  openDirection: string,
  leavesCount: string,
  hingesCount: string,
  pullView: boolean
) => {
  let RightBaseVisibility = true;
  if (!pullView || hingesCount === "TwoPieces") {
    RightBaseVisibility = false;
  }
  if (openDirection === "Left" && leavesCount === "SingleLeaf") {
    RightBaseVisibility = false;
  }

  return RightBaseVisibility ? "visible" : "hidden";
};

const getHandleData = (
  openDirection: string,
  pullView: boolean,
  handleTypeString: string
) => {
  let handleData = {
    handleType: "",
    HandleAxisRelativeShift: { X: 0, Y: 0 },
  };
  let handleToYouOpenDirection = "R";
  if (
    (pullView && openDirection === "Left") ||
    (!pullView && openDirection === "Right")
  ) {
    handleToYouOpenDirection = "L";
  }

  const handleType = `${handleTypeString}_${handleToYouOpenDirection}`;
  handleData = {
    handleType: handleType,
    HandleAxisRelativeShift: HANDLE_AXIS_RELATIVE_SHIFT_X.get(handleType),
  };

  return handleData;
};

export {
  values,
  CLOSER_SHIFT_X,
  CLOSER_SHIFT_INSIDE_Y,
  CLOSER_SHIFT_OUTSIDE_Y,
  CLOSER_WIDTH_X,
  FRAME_MIN,
  FRAME_MAX,
  FRAME_PROFILE_WIDTH_VISIBLE_X,
  FRAME_PROFILE_WIDTH_X,
  GLAZING_CENTER_SHIFT_X,
  GLAZING_CENTER_SHIFT_Y,
  GLAZING_CENTER_Y,
  LEAF_MIN,
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
};
