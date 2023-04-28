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
    dinDirection,
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
    leavesCount,
    thirdHingePosition,
    thresholdHeight_Y,
    thresholdHeightVisible_Y,
    useDoorCloser,
    useGlazing,
    doorHeight_Y,
    hingeUpUnderTop_Y,
    hingeDownOverBottom_Y,
  } = values;

  const isExactlyHalf = activeLeafWidth_X.type === "exactlyHalf";
  const isDoubleLeaf = leavesCount.value === "DoubleLeaf";

  const isDisabled_leavesCount =
    doorWidth_X.value < 1200 || doorWidth_X.value > 1800;
  const isDisabled_activeLeafWidth_X =
    doorWidth_X.value < 1200 || !isDoubleLeaf;
  const isDisabled_ActiveLeafWidth_X = !isDoubleLeaf || isExactlyHalf;

  const hingesCountOptions = [
    { value: "TwoPieces", displayName: "Two Pieces" },
    { value: "ThreePieces", displayName: "Three Pieces" },
  ];
  const thirdHingePositionOptions = [
    { value: "Size500mmUnderTheTop", displayName: "500 mm Under The Top" },
    { value: "Betwen", displayName: "Betwen Hinges" },
  ];

  const leavesCountOptions = [
    { value: "SingleLeaf", displayName: "Single Leaf" },
    { value: "DoubleLeaf", displayName: "Double Leaf" },
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
    const doorHeightInfluentMax = 1500;
    const doorHeightInfluentHingeMin = 1201;
    const doorHeightInfluentHandleMin = 1100;
    const doorHeightInfluent = 1100;
    onChange("doorHeight_Y", { ...doorHeight_Y, value: +value });
    if (+value < doorHeightInfluentMax && +value > doorHeightInfluentHingeMin) {
      onChange("hingeDownOverBottom_Y", {
        ...hingeDownOverBottom_Y,
        max: +value - doorHeightInfluent,
        value: +value - doorHeightInfluent,
      });
    }
    if (
      +value < doorHeightInfluentMax &&
      +value > doorHeightInfluentHandleMin
    ) {
      onChange("handleHeight_Y", `${+value - 450}`);
    }
  };

  const handleWidthChange = (value: string) => {
    const doorWidthInfluentMax = 1800;
    const doorWidthInfluentMin = 1200;
    onChange("doorWidth_X", { ...doorWidth_X, value: +value });
    if (+value < doorWidthInfluentMin) {
      handleLeavesCount("SingleLeaf");
      handleActiveLeafWidthType("number");
    }
    if (+value > doorWidthInfluentMax) {
      handleLeavesCount("DoubleLeaf");
    }
    const activeWidthMax = getLimitedActiveLeafWidth(0).max;
    console.log("activeWidthMax", activeWidthMax);
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
    if (chosenValue.value === leavesCountOptions[0].value) {
      onChange("activeLeafWidth_X", {
        ...activeLeafWidth_X,
        type: activeLeafWidthOptions[1].value,
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
    onChange("activeLeafWidth_X", {
      ...activeLeafWidth_X,
      max: getLimitedActiveLeafWidth(value).max,
      value: getLimitedActiveLeafWidth(value).value,
    });
  };

  return (
    <div className="ConfigureMenu">
      <div className="displayFlex rowOdd">
        <p className="width20percent">Door size</p>
        <NumericInput
          min={doorWidth_X.min}
          max={doorWidth_X.max}
          value={doorWidth_X.value}
          label="Installation Width"
          className="inputAndLabel displayFlex width40percent"
          getNumber={(value: string) => handleWidthChange(value)}
        />
        <NumericInput
          min={doorHeight_Y.min}
          max={doorHeight_Y.max}
          value={doorHeight_Y.value}
          label="Installation Height"
          className="inputAndLabel displayFlex width40percent"
          getNumber={(value: string) => handleHeightChange(value)}
        />
      </div>
      <div className="displayFlex rowEven">
        <p className="width20percent">Color</p>

        <ColorPickerWithSearch
          getColor={(value: string) => onChange("doorLeafColor", value)}
          label="Door Leaf"
          className="inputAndLabel width40percent"
          colorName={doorLeafColor}
        />
        <ColorPickerWithSearch
          getColor={(value: string) => onChange("frameColor", value)}
          label="Door Frame"
          className="inputAndLabel width40percent"
          colorName={frameColor}
        />
      </div>
      <div className="displayFlex rowOdd">
        <p className="width20percent">Threshold</p>
        <NumericInput
          min={thresholdHeight_Y.min}
          max={thresholdHeight_Y.max}
          value={thresholdHeight_Y.value}
          label="Height"
          className="inputAndLabel displayFlex width40percent"
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
          className="inputAndLabel displayFlex width40percent"
          getNumber={(value: string) =>
            onChange("thresholdHeightVisible_Y", {
              ...thresholdHeightVisible_Y,
              max: thresholdHeight_Y.value,
              value: +value,
            })
          }
        />
      </div>
      <div className="displayFlex rowEven">
        <p className="width20percent">Frame Profile X</p>
        <NumericInput
          min={frameProfileWidth_X.min}
          max={frameProfileWidth_X.max}
          value={frameProfileWidth_X.value}
          label="Width"
          className="inputAndLabel displayFlex width40percent"
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
          className="inputAndLabel displayFlex width40percent"
          getNumber={(value: string) =>
            onChange("frameProfileWidthVisible_X", {
              ...frameProfileWidthVisible_X,
              max: frameProfileWidth_X.value,
              value: +value,
            })
          }
        />
      </div>
      <div className="displayFlex rowOdd">
        <p className="width20percent">Frame Jumb Y</p>
        <NumericInput
          min={frameJumb_Y.min}
          max={frameJumb_Y.max}
          value={frameJumb_Y.value}
          label="Heigth"
          className="inputAndLabel displayFlex width40percent"
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
          className="inputAndLabel displayFlex width40percent"
          getNumber={(value: string) =>
            onChange("frameJumbVisible_Y", {
              ...frameJumbVisible_Y,
              max: frameJumb_Y.value,
              value: +value,
            })
          }
        />
      </div>
      <div className="displayFlex rowEven">
        <p className="width20percent">Hinges</p>
        <NumericInput
          min={0}
          max={200}
          value={hingeUpUnderTop_Y.value}
          label="Up Under Top"
          className="inputAndLabel displayFlex width40percent"
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
          className="inputAndLabel displayFlex width40percent"
          getNumber={(value: string) =>
            onChange("hingeDownOverBottom_Y", {
              ...hingeDownOverBottom_Y,
              value: +value,
            })
          }
        />
      </div>
      <div className="displayFlex rowOdd">
        <p className="width20percent">Hinges</p>
        <Dropdown
          options={hingesCountOptions}
          value={hingesCount.value}
          label="Hinges Count"
          className="inputAndLabel displayFlex width40percent"
          onChange={(value: string) =>
            onChange("hingesCount", { ...hingesCount, value })
          }
        />
        <Dropdown
          options={thirdHingePositionOptions}
          value={thirdHingePosition.value}
          label="Third Hinge Position"
          className="inputAndLabel displayFlex width40percent"
          onChange={(value: string) =>
            onChange("thirdHingePosition", { ...thirdHingePosition, value })
          }
        />
      </div>
      <div className="displayFlex rowEven">
        <p className="width10percent">Configure Double Leavs</p>
        <RadioButtonGroup
          groupName="leavesCount"
          value={leavesCount.value}
          options={leavesCountOptions}
          onChange={handleLeavesCount}
          disabled={isDisabled_leavesCount}
          className="width30percent"
        />

        <RadioButtonGroup
          groupName="Active Leaf Type"
          value={activeLeafWidth_X.type}
          options={activeLeafWidthOptions}
          onChange={handleActiveLeafWidthType}
          disabled={isDisabled_activeLeafWidth_X}
          className="width30percent"
        />

        <NumericInput
          min={activeLeafWidth_X.min}
          max={activeLeafWidth_X.max}
          value={activeLeafWidth_X.value}
          label="Active Leaf Width"
          className="inputAndLabel displayFlex width30percent"
          disabled={isDisabled_ActiveLeafWidth_X}
          getNumber={handleActiveLeafWidth}
        />
      </div>

      <p>GLASING_TYPE = 'glasses_round_300_300' "Glasses_square_300_300"</p>
      <p>HANDLE_TYPE = 'square'; // ["square", "round","long"]</p>
      <p>
        HANDLE: 'long_L','long_R', 'square_L', 'square_R', 'round_L', 'round_R'
      </p>
      <p>dinDirection: "Left", // "Left", "Right"</p>
    </div>
  );
};

export default ConfigureMenu;
