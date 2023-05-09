import React, { useContext } from "react";
import ColorPickerWithSearch from "../ColorPickerWithSearch/ColorPickerWithSearch";
import NumericInput from "../NumericInputWithLimits/NumericInputWithLimits";
import ValuesContext from "../ValuesContext/ValuesContext";
import { ValuesType } from "../types";
import Dropdown from "../Dropdown/Dropdown";
import RadioButtonGroup from "../Radiobutton/Radiobutton";
import { LEAF_MIN } from "../StellDoorVisualizer/utils";
const ConfigureMenu = () => {
  const { values, setValues } = useContext(ValuesContext);
  const {
    activeLeafWidth_X,
    activeLeafWidthOptions,
    openDirection,
    closerMountedPosition,
    doorLeafColor,
    frameColor,
    frameJumb_Y,
    frameJumbVisible_Y,
    frameProfileWidth_X,
    frameProfileWidthVisible_X,
    hingesCount,
    doorWidth_X,
    leavesCount,
    thirdHingePosition,
    thresholdHeight_Y,
    thresholdHeightVisible_Y,
    useDoorCloser,
    useGlazing,
    doorHeight_Y,
    hingeUpUnderTop_Y,
    hingeDownOverBottom_Y,
    handleTypeString,
    glazingType,
    useSecondCloser,
    leafWidthMinForDouble_X,
    leafWidthMaxForDouble_X,
    doorHeightInfluentMax_Y,
    doorHeightInfluentHingeMin_Y,
    doorHeightInfluentHandleMin_Y,
    doorHeightInfluent_Y,
  } = values;
  const isExactlyHalf = activeLeafWidth_X.type === "exactlyHalf";
  const isDoubleLeaf = leavesCount.value === "DoubleLeaf";
  const isDisabled_leavesCount =
    doorWidth_X.value < leafWidthMinForDouble_X ||
    doorWidth_X.value > leafWidthMaxForDouble_X;
  const isDisabled_activeLeafWidth_X =
    doorWidth_X.value < leafWidthMinForDouble_X || !isDoubleLeaf;
  const isDisabled_ActiveLeafWidth_X = !isDoubleLeaf || isExactlyHalf;

  const hingesCountOptions = [
    { value: "TwoPieces", displayName: "Two Pieces" },
    { value: "ThreePieces", displayName: "Three Pieces" },
  ];
  const thirdHingePositionOptions = [
    { value: "Size500mmUnderTheTop", displayName: "500 mm Under The Top" },
    { value: "Betwen", displayName: "Betwen Hinges" },
  ];
  const openDirectionOptions = [
    { value: "Left", displayName: "Left hand pull" },
    { value: "Right", displayName: "Right hand pull" },
  ];
  const handleTypeOptions = [
    { value: "long", displayName: "Long" },
    { value: "square", displayName: "Square" },
    { value: "round", displayName: "Round" },
  ];
  const leavesCountOptions = [
    { value: "SingleLeaf", displayName: "Single Leaf" },
    { value: "DoubleLeaf", displayName: "Double Leaf" },
  ];
  const useGlazingOptions = [
    { value: "useGlazing", displayName: "Glazing" },
    { value: "noGlazing", displayName: "No Glazing" },
  ];
  const useGlazingTypeOptions = [
    { value: "no", displayName: "No Glazing" },
    { value: "Round", displayName: "Round" },
    { value: "Square", displayName: "Square" },
  ];
  const useDoorCloserOptions = [
    { value: "useDoorCloser", displayName: "Closer" },
    { value: "noDoorCloser", displayName: "No Closer" },
  ];
  const closerMountedPositionOptions = [
    { value: "Outside", displayName: "Outside" },
    { value: "Inside", displayName: "Inside" },
  ];
  const useSecondCloserOptions = [
    { value: "useSecondCloser", displayName: "Second Closer" },
    { value: "noSecondCloser", displayName: "No Second Closer" },
  ];

  const onChange = <T extends keyof ValuesType>(
    propName: T,
    value: ValuesType[T]
  ): void => {
    values[propName] = value;
    setValues(values);
  };

  const handleLeadindDependentChange = (
    leading: keyof ValuesType,
    leadingMin: number,
    leadingMax: number,
    dependent: keyof ValuesType,
    dependentMin: number,
    dependentValue: number,
    value: string
  ) => {
    onChange(leading, {
      min: leadingMin,
      max: leadingMax,
      value: +value,
    });
    if (dependentValue > +value) {
      onChange(dependent, {
        min: dependentMin,
        max: +value,
        value: +value,
      });
    }
  };

  const handleHeightChange = (value: string) => {
    onChange("doorHeight_Y", { ...doorHeight_Y, value: +value });
    if (
      +value < doorHeightInfluentMax_Y &&
      +value > doorHeightInfluentHingeMin_Y
    ) {
      onChange("hingeDownOverBottom_Y", {
        ...hingeDownOverBottom_Y,
        max: +value - doorHeightInfluent_Y,
        value: +value - doorHeightInfluent_Y,
      });
    }
    if (
      +value < doorHeightInfluentMax_Y &&
      +value > doorHeightInfluentHandleMin_Y
    ) {
      onChange("handleHeight_Y", `${+value - 450}`);
    }
  };

  const handleWidthChange = (value: string) => {
    onChange("doorWidth_X", { ...doorWidth_X, value: +value });
    if (+value < leafWidthMinForDouble_X) {
      handleLeavesCount("SingleLeaf");
      handleActiveLeafWidthType("number");
    }
    if (+value > leafWidthMaxForDouble_X) {
      handleLeavesCount("DoubleLeaf");
    }
    const activeWidthMax = getLimitedActiveLeafWidth(0).max;
    if (!isDoubleLeaf) {
      onChange("activeLeafWidth_X", {
        ...activeLeafWidth_X,
        value: doorWidth_X.value - frameProfileWidthVisible_X.value * 2,
      });
    } else {
      if (isExactlyHalf) {
        onChange("activeLeafWidth_X", {
          ...activeLeafWidth_X,
          value: doorWidth_X.value / 2 - frameProfileWidthVisible_X.value,
        });
      }
    }

    if (activeLeafWidth_X.value > activeWidthMax) {
      onChange("activeLeafWidth_X", {
        ...activeLeafWidth_X,
        max: activeWidthMax,
        value: activeWidthMax,
      });
    }
  };

  const handleLeavesCount = (value: any) => {
    const chosenValue = leavesCountOptions.filter(
      (option) => option.value === value
    )[0];
    onChange("leavesCount", chosenValue);
    if (chosenValue.value === "SingleLeaf") {
      onChange("activeLeafWidth_X", {
        ...activeLeafWidth_X,
        type: "number",
        value: doorWidth_X.value - frameProfileWidthVisible_X.value * 2,
      });
    } else if (chosenValue.value === "DoubleLeaf") {
      onChange("activeLeafWidth_X", {
        ...activeLeafWidth_X,
        type: "exactlyHalf",
      });
    }
  };

  const handleActiveLeafWidthType = (type: string) => {
    const option = activeLeafWidthOptions.filter(
      (option) => option.value === type
    )[0];

    const limitedActiveLeafWidth = getLimitedActiveLeafWidth(0);
    onChange("activeLeafWidth_X", {
      ...activeLeafWidth_X,
      type: option.value,
      displayName: option.value,
      value: limitedActiveLeafWidth.value,
    });
  };

  const getLimitedActiveLeafWidth = (value: number) => {
    let widthMax = 0;
    let limitedActiveLeafWidth = { max: 0, value: 0 };
    if (isDoubleLeaf) {
      if (isExactlyHalf) {
        widthMax = doorWidth_X.value / 2 - frameProfileWidthVisible_X.value;
        limitedActiveLeafWidth = { max: widthMax, value: widthMax };
      } else {
        widthMax =
          doorWidth_X.value - 2 * frameProfileWidthVisible_X.value - LEAF_MIN;
        limitedActiveLeafWidth =
          value < widthMax
            ? { max: widthMax, value }
            : { max: widthMax, value: widthMax };
      }
    } else {
      widthMax = doorWidth_X.value - 2 * frameProfileWidthVisible_X.value;
      limitedActiveLeafWidth = { max: widthMax, value: widthMax };
    }

    return limitedActiveLeafWidth;
  };

  const handleActiveLeafWidth = (value: number) => {
    const leftLeafPullWidth_X = getLimitedActiveLeafWidth(value).value;

    onChange("activeLeafWidth_X", {
      ...activeLeafWidth_X,
      max: getLimitedActiveLeafWidth(value).max,
      value: leftLeafPullWidth_X,
    });
  };

  const handleOnChangeGlaZing = (value: string) => {
    if (value !== "no") {
      onChange("glazingType", { ...glazingType, value });
    } else {
      onChange("useGlazing", false);
      onChange("glazingType", { ...glazingType, value: "no" });
    }
  };

  const handleOnChangeUseGlaZing = (value: string) => {
    onChange("useGlazing", value === "useGlazing");
    if (value === "useGlazing") {
      onChange("glazingType", { ...glazingType, value: "Square" });
    } else {
      onChange("glazingType", { ...glazingType, value: "no" });
    }
  };

  const handleCloserMountedPosition = (value: any) => {
    const chosenValue = closerMountedPositionOptions.filter(
      (option) => option.value === value
    )[0];
    onChange("closerMountedPosition", chosenValue);
  };

  const handleUseCloser = (value: string) => {
    const isUse = value === "useDoorCloser";
    onChange("useDoorCloser", isUse);
    if (!isUse) onChange("useSecondCloser", false);
  };
  const isDisabledSecondCloser =
    !useDoorCloser || leavesCount.value === "SingleLeaf";

  return (
    <div className="ConfigureMenu">
      <div className="displayFlex rowOdd">
        <p className="width100">Door size</p>
        <div className="displayFlex control">
          <NumericInput
            min={doorWidth_X.min}
            max={doorWidth_X.max}
            value={doorWidth_X.value}
            label="Installation Width"
            className="displayFlex"
            getNumber={handleWidthChange}
          />
          <NumericInput
            min={doorHeight_Y.min}
            max={doorHeight_Y.max}
            value={doorHeight_Y.value}
            label="Installation Height"
            className="displayFlex"
            getNumber={handleHeightChange}
          />
        </div>
      </div>
      <div className="displayFlex rowEven">
        <p className="width100">Color</p>
        <div className="displayFlex control">
          <ColorPickerWithSearch
            getColor={(value: string) => onChange("doorLeafColor", value)}
            label="Door Leaf"
            colorName={doorLeafColor}
            className="displayFlex"
          />
          <ColorPickerWithSearch
            getColor={(value: string) => onChange("frameColor", value)}
            label="Door Frame"
            className="displayFlex"
            colorName={frameColor}
          />
        </div>
      </div>
      <div className="displayFlex rowOdd">
        <p className="width100">Threshold</p>
        <div className="displayFlex control">
          <NumericInput
            min={thresholdHeight_Y.min}
            max={thresholdHeight_Y.max}
            value={thresholdHeight_Y.value}
            label="Height"
            className="displayFlex"
            getNumber={(value: string) =>
              handleLeadindDependentChange(
                "thresholdHeight_Y",
                thresholdHeight_Y.min,
                thresholdHeight_Y.max,
                "thresholdHeightVisible_Y",
                thresholdHeightVisible_Y.min,
                thresholdHeightVisible_Y.value,
                value
              )
            }
          />
          <NumericInput
            min={thresholdHeightVisible_Y.min}
            max={thresholdHeightVisible_Y.max}
            value={thresholdHeightVisible_Y.value}
            label="Height Visible"
            className="displayFlex"
            getNumber={(value: string) =>
              onChange("thresholdHeightVisible_Y", {
                ...thresholdHeightVisible_Y,
                max: thresholdHeight_Y.value,
                value: +value,
              })
            }
          />
        </div>
      </div>
      <div className="displayFlex rowEven">
        <p className="width100">Frame Profile X</p>
        <div className="displayFlex control">
          <NumericInput
            min={frameProfileWidth_X.min}
            max={frameProfileWidth_X.max}
            value={frameProfileWidth_X.value}
            label="Width"
            className="displayFlex"
            getNumber={(value: string) =>
              handleLeadindDependentChange(
                "frameProfileWidth_X",
                frameProfileWidth_X.min,
                frameProfileWidth_X.max,
                "frameProfileWidthVisible_X",
                frameProfileWidthVisible_X.min,
                frameProfileWidthVisible_X.value,
                value
              )
            }
          />
          <NumericInput
            min={frameProfileWidthVisible_X.min}
            max={frameProfileWidth_X.value}
            value={frameProfileWidthVisible_X.value}
            label="Width Visible"
            className="displayFlex"
            getNumber={(value: string) =>
              onChange("frameProfileWidthVisible_X", {
                ...frameProfileWidthVisible_X,
                max: frameProfileWidth_X.value,
                value: +value,
              })
            }
          />
        </div>
      </div>
      <div className="displayFlex rowOdd">
        <p className="width100">Frame Jumb Y</p>
        <div className="displayFlex control">
          <NumericInput
            min={frameJumb_Y.min}
            max={frameJumb_Y.max}
            value={frameJumb_Y.value}
            label="Heigth"
            className="displayFlex"
            getNumber={(value: string) =>
              handleLeadindDependentChange(
                "frameJumb_Y",
                frameJumb_Y.min,
                frameJumb_Y.max,
                "frameJumbVisible_Y",
                frameJumbVisible_Y.min,
                frameJumbVisible_Y.value,
                value
              )
            }
          />
          <NumericInput
            min={frameJumbVisible_Y.min}
            max={frameJumb_Y.value}
            value={frameJumbVisible_Y.value}
            label="Heigth Visible"
            className="displayFlex"
            getNumber={(value: string) =>
              onChange("frameJumbVisible_Y", {
                ...frameJumbVisible_Y,
                max: frameJumb_Y.value,
                value: +value,
              })
            }
          />
        </div>
      </div>
      <div className="displayFlex rowEven">
        <p className="width100">Hinges</p>
        <div className="displayFlex control">
          <NumericInput
            min={0}
            max={200}
            value={hingeUpUnderTop_Y.value}
            label="Up Under Top"
            className="displayFlex"
            getNumber={(value: string) =>
              onChange("hingeUpUnderTop_Y", {
                ...hingeUpUnderTop_Y,
                value: +value,
              })
            }
          />
          <NumericInput
            min={hingeDownOverBottom_Y.min}
            max={hingeDownOverBottom_Y.max}
            value={hingeDownOverBottom_Y.value}
            label="Down Over Bottom"
            className="displayFlex"
            getNumber={(value: string) =>
              onChange("hingeDownOverBottom_Y", {
                ...hingeDownOverBottom_Y,
                value: +value,
              })
            }
          />
        </div>
      </div>
      <div className="displayFlex rowOdd">
        <p className="width100">Hinges</p>
        <div className="displayFlex control">
          <Dropdown
            options={hingesCountOptions}
            value={hingesCount.value}
            label="Hinges Count"
            className=" displayFlex "
            onChange={(value: string) =>
              onChange("hingesCount", { ...hingesCount, value })
            }
          />
          <Dropdown
            options={thirdHingePositionOptions}
            value={thirdHingePosition.value}
            label="Third Hinge Position"
            className=" displayFlex "
            onChange={(value: string) =>
              onChange("thirdHingePosition", { ...thirdHingePosition, value })
            }
          />
        </div>
      </div>
      <div className="displayFlex rowEven">
        <p className="width100">Configure Double Leavs</p>
        <div className="displayFlex control">
          <RadioButtonGroup
            groupName="leavesCount"
            value={leavesCount.value}
            options={leavesCountOptions}
            onChange={handleLeavesCount}
            disabled={isDisabled_leavesCount}
          />

          <RadioButtonGroup
            groupName="Active Leaf Type"
            value={activeLeafWidth_X.type}
            options={activeLeafWidthOptions}
            onChange={handleActiveLeafWidthType}
            disabled={isDisabled_activeLeafWidth_X}
          />

          <NumericInput
            min={activeLeafWidth_X.min}
            max={activeLeafWidth_X.max}
            value={activeLeafWidth_X.value}
            label="Active Leaf Width"
            disabled={isDisabled_ActiveLeafWidth_X}
            getNumber={handleActiveLeafWidth}
          />
        </div>
      </div>
      <div className="displayFlex rowOdd">
        <p className="width100">Open</p>
        <div className="displayFlex control">
          <Dropdown
            options={handleTypeOptions}
            value={handleTypeString}
            label="Handle Type"
            className="displayFlex"
            onChange={(value: string) => onChange("handleTypeString", value)}
          />
          <Dropdown
            options={openDirectionOptions}
            value={openDirection.value}
            label="Open Direction"
            className="displayFlex"
            onChange={(value: string) =>
              onChange("openDirection", { ...openDirection, value })
            }
          />
        </div>
      </div>
      <div className="displayFlex rowEven">
        <p className="width100">Glazing</p>
        <div className="displayFlex control">
          <RadioButtonGroup
            groupName="use Glazing"
            value={
              useGlazing
                ? useGlazingOptions[0].value
                : useGlazingOptions[1].value
            }
            options={useGlazingOptions}
            onChange={handleOnChangeUseGlaZing}
          />
          <Dropdown
            options={useGlazingTypeOptions}
            // value={"no"}
            value={glazingType.value}
            label="Glazing Type"
            className="displayFlex"
            onChange={handleOnChangeGlaZing}
            disabled={!useGlazing}
          />
        </div>
      </div>
      <div className="displayFlex rowOdd">
        <p className="width100">Closer</p>
        <div className="displayFlex control">
          <RadioButtonGroup
            groupName="use Door Closer"
            value={
              useDoorCloser
                ? useDoorCloserOptions[0].value
                : useDoorCloserOptions[1].value
            }
            options={useDoorCloserOptions}
            onChange={handleUseCloser}
          />
          <RadioButtonGroup
            groupName="Mounted position"
            value={closerMountedPosition.value}
            options={closerMountedPositionOptions}
            onChange={handleCloserMountedPosition}
            disabled={!useDoorCloser}
          />
          <RadioButtonGroup
            groupName="Second Closer"
            value={
              useSecondCloser
                ? useSecondCloserOptions[0].value
                : useSecondCloserOptions[1].value
            }
            options={useSecondCloserOptions}
            onChange={(value: string) => {
              const isUse = value === "useSecondCloser";
              onChange("useSecondCloser", isUse);
            }}
            disabled={isDisabledSecondCloser}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigureMenu;
