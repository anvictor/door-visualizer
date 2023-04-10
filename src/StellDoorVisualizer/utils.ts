import { ValuesType } from "../types";
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
const DOOR_WIDTH_MIN_X = 700;
const DOOR_WIDTH_X = 920;
const DOOR_WIDTH_MAX_X = 2800;
const DOOR_HEIGHT_MIN_Y = 900;
const DOOR_HEIGHT_MAX_Y = 3000;
const DOOR_HEIGHT_Y = 2200;
const THRESH_HOLD_HEIGHT_VISIBLE_Y = 5;
const FRAME_MIN = 30;
const FRAME_MAX = 70;
const FRAME_PROFILE_WIDTH_VISIBLE_X = 40;
const FRAME_PROFILE_WIDTH_X = 70;
const FRAME_JUMB_VISIBLE_Y = 15;
const FRAME_JUMB_X = 50;
const STROKE_COLOR = "black";
const HINGE_UP_UNDER_TOP_MIN_Y = 0;
const HINGE_UP_UNDER_TOP_MAX_Y = 200;
const HINGE_UP_UNDER_TOP_Y = 150;
const THRESH_HOLD_HEIGHT_Y = 55;
const HINGE_DOWN_OVER_BOTTOM_MIN_Y = 0;
const HINGE_DOWN_OVER_BOTTOM_MAX_Y = 500;
const HINGE_DOWN_OVER_BOTTOM_Y = 400;
const HINGE_WIDTH_X = 18;
const HINGE_HEIGHT_Y = 132;
const GLASING_TYPE = "glasses_round_300_300"; // "glasses_round_300_300","Glasses_square_300_300"
const GLASING_CENTER_Y = 1780;
const GLASING_CENTER_SHIFT_X = 150;
const GLASING_CENTER_SHIFT_Y = 150;
const CLOSER_WIDTH_X = 578;
const CLOSER_SHIFT_X = 20;
const CLOSER_SHIFT_Y = 30;
const HANDLE_TYPE = "square"; // ["square", "round", "long"]
const LOCK_SHIFT_X = 50;
const ACTIVE_TO_PASSIVE_LEAF_OVERLAP = 40;
const ACTIVE_LEAF_WIDTH = "exactlyHalf"; // ['number' as string || 'exactlyHalf']
const HANDLE_AXIS_RELATIVE_SHIFT_X = new Map();
HANDLE_AXIS_RELATIVE_SHIFT_X.set("long_L", { X: 118, Y: 76 });
HANDLE_AXIS_RELATIVE_SHIFT_X.set("long_R", { X: 16, Y: 76 });
HANDLE_AXIS_RELATIVE_SHIFT_X.set("square_L", { X: 118, Y: 26 });
HANDLE_AXIS_RELATIVE_SHIFT_X.set("square_R", { X: 26, Y: 26 });
HANDLE_AXIS_RELATIVE_SHIFT_X.set("round_L", { X: 117, Y: 25 });
HANDLE_AXIS_RELATIVE_SHIFT_X.set("round_R", { X: 25, Y: 25 });

const values: ValuesType = {
  dinDirection: {value:"Left", displayName:"Left"}, // "Left", "Right"
  doorCloser: "up",
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
  handleHeight: "1050",
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
  leavesCount: {value:"SingleLeaf", displayName:"Single Leaf"}, //"DoubleLeaf","SingleLeaf"
  thirdHingePosition: {value:"Betwen",displayName:"Betwen"}, //"Size500mmUnderTheTop", "Betwen"
  treshHoldHeight_Y: {
    min: FRAME_MIN,
    max: FRAME_MAX,
    value: THRESH_HOLD_HEIGHT_Y,
  },
  treshHoldHeightVisible_Y: {
    min: FRAME_MIN,
    max: FRAME_MAX,
    value: THRESH_HOLD_HEIGHT_VISIBLE_Y,
  },
  useDoorCloser: false,
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
  dinDirection: string,
  pullView: boolean,
  frameProfileWidthVisible_X: number
) => {
  /*
  H-two door leafs from PULL view side devided visual width HALF or NOT 
  P-PULL view side or NOT
  D-DOUBLE leafs or NOT 
  L-active LEFT or NOT?
   
   H P D L
____________
   0 0 0 0
   0 0 0 1
   0 0 1 0
   0 0 1 1
   0 1 0 0
   0 1 0 1
   0 1 1 0
   0 1 1 1
   1 0 0 0
   1 0 0 1
   1 0 1 0
   1 0 1 1
   1 1 0 0
   1 1 0 1
   1 1 1 0
   1 1 1 1
   */
  let pictureLeafLeftWidth_X = 200;
  // no lint error
  const isExactlyHalf = ACTIVE_LEAF_WIDTH === "exactlyHalf";
  const indexLogicLeafLeftWidth =
    1000 * +isExactlyHalf +
    100 * +pullView +
    10 * +isDoubleLeaf +
    +(dinDirection === "Left");

  let indexLeafPicture = "";
  if (
    indexLogicLeafLeftWidth === 0 ||
    indexLogicLeafLeftWidth === 1 ||
    indexLogicLeafLeftWidth === 100 ||
    indexLogicLeafLeftWidth === 101 ||
    indexLogicLeafLeftWidth === 1000 ||
    indexLogicLeafLeftWidth === 1001 ||
    indexLogicLeafLeftWidth === 1100 ||
    indexLogicLeafLeftWidth === 1101
  ) {
    indexLeafPicture = "one_leaf";
  }
  if (indexLogicLeafLeftWidth === 10) {
    indexLeafPicture = "right_push_active";
  }
  if (indexLogicLeafLeftWidth === 11) {
    indexLeafPicture = "right_push_passive";
  }
  if (indexLogicLeafLeftWidth === 110) {
    indexLeafPicture = "left_pull_passive";
  }
  if (indexLogicLeafLeftWidth === 111) {
    indexLeafPicture = "left_pull_active";
  }
  if (indexLogicLeafLeftWidth === 1010) {
    indexLeafPicture = "right_push_is_overlaped";
  }
  if (indexLogicLeafLeftWidth === 1011) {
    indexLeafPicture = "right_push_overlaps";
  }
  if (indexLogicLeafLeftWidth === 1110 || indexLogicLeafLeftWidth === 1111) {
    indexLeafPicture = "pull_half";
  }

  switch (indexLeafPicture) {
    case "one_leaf":
      pictureLeafLeftWidth_X = +frameWidth_X - frameProfileWidthVisible_X * 2;
      break;
    case "right_push_active":
      pictureLeafLeftWidth_X =
        +ACTIVE_LEAF_WIDTH - ACTIVE_TO_PASSIVE_LEAF_OVERLAP;
      break;
    case "right_push_passive":
      pictureLeafLeftWidth_X =
        +frameWidth_X -
        frameProfileWidthVisible_X * 2 -
        +ACTIVE_LEAF_WIDTH +
        ACTIVE_TO_PASSIVE_LEAF_OVERLAP;
      break;
    case "left_pull_passive":
      pictureLeafLeftWidth_X =
        +frameWidth_X - frameProfileWidthVisible_X * 2 - +ACTIVE_LEAF_WIDTH;
      break;
    case "left_pull_active":
      pictureLeafLeftWidth_X = +ACTIVE_LEAF_WIDTH;
      break;
    case "right_push_is_overlaped":
      pictureLeafLeftWidth_X =
        (+frameWidth_X - frameProfileWidthVisible_X * 2) / 2 -
        +ACTIVE_TO_PASSIVE_LEAF_OVERLAP;
      break;
    case "right_push_overlaps": //*
      pictureLeafLeftWidth_X =
        (+frameWidth_X - frameProfileWidthVisible_X * 2) / 2 +
        +ACTIVE_TO_PASSIVE_LEAF_OVERLAP;
      break;
    case "pull_half":
      pictureLeafLeftWidth_X =
        (+frameWidth_X - frameProfileWidthVisible_X * 2) / 2;
      break;
    default:
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
  dinDirection: string,
  pullView: boolean,
  frameHeight_Y: number
) => {
  const handleAxisDescent_Y = getHandleData(dinDirection, pullView)
    .HandleAxisRelativeShift.Y;
  return add_10_Percents(+frameHeight_Y) - +handleHeight + handleAxisDescent_Y;
};

const getHandle_X = (
  dinDirection: string,
  isDoubleLeaf: boolean,
  pictureLeafLeft_X: number,
  pictureLeafLeftWidth_X: number,
  pictureLeafRight_X: number,
  pictureLeafRightWidth_X: number,
  pullView: boolean
) => {
  let handle_X = 0;
  /*
    PULL? Double? Left?  handle-position-X=
    0 0 0               pictureLeafLeft_X +               // *
                        pictureLeafLeftWidth_X -
                        ACTIVE_TO_PASSIVE_LEAF_OVERLAP -
                        LOCK_SHIFT_X -
                        handleAxisShift_X

    0 0 1               pictureLeafLeft_X +               // **              
                        ACTIVE_TO_PASSIVE_LEAF_OVERLAP +
                        LOCK_SHIFT_X -
                        handleAxisShift_X

    0 1 0               pictureLeafLeft_X +               // ***
                        pictureLeafLeftWidth_X -
                        LOCK_SHIFT_X -
                        handleAxisShift_X

    0 1 1               pictureLeafRight_X +               // ****
                        LOCK_SHIFT_X -
                        handleAxisShift_X

    1 0 0               pictureLeafLeft_X +               // **
                        ACTIVE_TO_PASSIVE_LEAF_OVERLAP +
                        LOCK_SHIFT_X -
                        handleAxisShift_X

    1 0 1               pictureLeafLeft_X +               // *
                        pictureLeafLeftWidth_X -
                        ACTIVE_TO_PASSIVE_LEAF_OVERLAP -
                        LOCK_SHIFT_X -
                        handleAxisShift_X

    1 1 0               pictureLeafRight_X +               // ***** 
                        ACTIVE_TO_PASSIVE_LEAF_OVERLAP +
                        LOCK_SHIFT_X -
                        handleAxisShift_X

    1 1 1               pictureLeafLeft_X +               // *
                        pictureLeafLeftWidth_X -
                        ACTIVE_TO_PASSIVE_LEAF_OVERLAP -
                        LOCK_SHIFT_X -
                        handleAxisShift_X
   */
  const indexLogicHandle_X =
    100 * +pullView + 10 * +isDoubleLeaf + +(dinDirection === "Left");

  let indexPictureHandle_X = "";
  if (
    indexLogicHandle_X === 0 ||
    indexLogicHandle_X === 101 ||
    indexLogicHandle_X === 111
  ) {
    indexPictureHandle_X = "handle_at_right_with_overlaping"; // *
  }
  if (indexLogicHandle_X === 1 || indexLogicHandle_X === 100) {
    indexPictureHandle_X = "handle_at_left_with_overlaping"; // **
  }
  if (indexLogicHandle_X === 10) {
    indexPictureHandle_X = "handle_at_left_no_overlaping"; // ***
  }
  if (indexLogicHandle_X === 11) {
    indexPictureHandle_X = "right_picture_leaf_handle_at_left_no_overlaping"; // ****
  }
  if (indexLogicHandle_X === 110) {
    indexPictureHandle_X = "right_picture_leaf_handle_at_left_with_overlaping"; // *****
  }

  const handleAxisShift_X = getHandleData(dinDirection, pullView)
    .HandleAxisRelativeShift.X;

  switch (indexPictureHandle_X) {
    case "handle_at_right_with_overlaping": // *
      handle_X =
        pictureLeafLeft_X +
        pictureLeafLeftWidth_X -
        ACTIVE_TO_PASSIVE_LEAF_OVERLAP -
        LOCK_SHIFT_X -
        handleAxisShift_X;
      break;
    case "handle_at_left_with_overlaping": // **
      handle_X =
        pictureLeafLeft_X +
        ACTIVE_TO_PASSIVE_LEAF_OVERLAP +
        LOCK_SHIFT_X -
        handleAxisShift_X;
      break;
    case "handle_at_left_no_overlaping": // ***
      handle_X =
        pictureLeafLeft_X +
        pictureLeafLeftWidth_X +
        LOCK_SHIFT_X -
        handleAxisShift_X;
      break;
    case "right_picture_leaf_handle_at_left_no_overlaping": // ****
      handle_X = pictureLeafRight_X + LOCK_SHIFT_X - handleAxisShift_X;
      break;
    case "right_picture_leaf_handle_at_left_with_overlaping": // *****
      handle_X =
        pictureLeafRight_X +
        ACTIVE_TO_PASSIVE_LEAF_OVERLAP +
        LOCK_SHIFT_X -
        handleAxisShift_X;
      break;

    default:
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
  console.log("thirdHingePosition", thirdHingePosition);
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
  dinDirection: string,
  leavesCount: string,
  pullView: boolean
) => {
  let LeftBaseVisibility = true;
  if (!pullView) {
    LeftBaseVisibility = false;
  }
  if (dinDirection === "Right" && leavesCount === "SingleLeaf") {
    LeftBaseVisibility = false;
  }

  return LeftBaseVisibility ? "visible" : "hidden";
};

const getHingeRightBaseVisibility = (
  dinDirection: string,
  leavesCount: string,
  pullView: boolean
) => {
  let RightBaseVisibility = true;
  if (!pullView) {
    RightBaseVisibility = false;
  }
  if (dinDirection === "Left" && leavesCount === "SingleLeaf") {
    RightBaseVisibility = false;
  }

  return RightBaseVisibility ? "visible" : "hidden";
};

const getHingeLeftAdditionalVisibility = (
  dinDirection: string,
  leavesCount: string,
  hingesCount: string,
  pullView: boolean
) => {
  let LeftBaseVisibility = true;
  if (!pullView || hingesCount === "TwoPieces") {
    LeftBaseVisibility = false;
  }
  if (dinDirection === "Right" && leavesCount === "SingleLeaf") {
    LeftBaseVisibility = false;
  }

  return LeftBaseVisibility ? "visible" : "hidden";
};

const getHingeRightAdditionalVisibility = (
  dinDirection: string,
  leavesCount: string,
  hingesCount: string,
  pullView: boolean
) => {
  let RightBaseVisibility = true;
  if (!pullView || hingesCount === "TwoPieces") {
    RightBaseVisibility = false;
  }
  if (dinDirection === "Left" && leavesCount === "SingleLeaf") {
    RightBaseVisibility = false;
  }

  return RightBaseVisibility ? "visible" : "hidden";
};

const getHandleData = (dinDirection: string, pullView: boolean) => {
  let handleData = {
    handleType: "",
    HandleAxisRelativeShift: { X: 0, Y: 0 },
  };
  let handleToYouOpenDirection = "R";
  if (
    (pullView && dinDirection === "Left") ||
    (!pullView && dinDirection === "Right")
  ) {
    handleToYouOpenDirection = "L";
  }

  const handleType = `${HANDLE_TYPE}_${handleToYouOpenDirection}`;
  handleData = {
    handleType: handleType,
    HandleAxisRelativeShift: HANDLE_AXIS_RELATIVE_SHIFT_X.get(handleType),
  };

  return handleData;
};

export {
  values,
  CLOSER_SHIFT_X,
  CLOSER_SHIFT_Y,
  CLOSER_WIDTH_X,
  FRAME_MIN,
  FRAME_MAX,
  GLASING_CENTER_SHIFT_X,
  GLASING_CENTER_SHIFT_Y,
  GLASING_CENTER_Y,
  GLASING_TYPE,
  // PATTERN_IMAGE_HEIGHT_Y,
  // PATTERN_IMAGE_WIDTH_X,
  // SHIFT_VIEWPORT_Y,
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
