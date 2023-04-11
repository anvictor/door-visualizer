import React, { useContext, useEffect, useState } from "react";
import ColorPickerWithSearch from "../ColorPickerWithSearch/ColorPickerWithSearch";
import NumericInput from "../NumericInputWithLimits/NumericInputWithLimits";
import ValuesContext from "../ValuesContext/ValuesContext";
import { ValuesType } from "../types";
import Dropdown from "../Dropdown/Dropdown";

const ConfigureMenu = () => {
  const { values, setValues } = useContext(ValuesContext);
  const {
    dinDirection,
    doorCloser,
    doorLeafColor,
    frameColor,
    frameJumb_Y,
    frameJumbVisible_Y,
    frameProfileWidth_X,
    frameProfileWidthVisible_X,
    handleHeight_Y: handleHeight,
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
  const hingesCountOptions = [
    { value: "TwoPieces", displayName: "Two Pieces" },
    { value: "ThreePieces", displayName: "Three Pieces" },
  ];
  const thirdHingePositionOptions = [
    { value: "Size500mmUnderTheTop", displayName: "500 mm Under The Top" },
    { value: "Betwen", displayName: "Betwen Hinges" },
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

  const handleHeightChange = (
    leading: keyof ValuesType,
    leadingMin: number,
    leadingMax: number,
    dependentHinge: keyof ValuesType,
    dependentHingeMin: number,
    dependentHandle: keyof ValuesType,
    value: string
  ) => {
    const doorHeightInfluentMax = 1500;
    const doorHeightInfluentHingeMin = 1201;
    const doorHeightInfluentHandleMin = 1100;
    const doorHeightInfluent = 1100;
    onChange(leading, {
      min: leadingMin,
      max: leadingMax,
      value: +value,
    });
    if (+value < doorHeightInfluentMax && +value > doorHeightInfluentHingeMin) {
      onChange(dependentHinge, {
        min: dependentHingeMin,
        max: +value - doorHeightInfluent,
        value: +value - doorHeightInfluent,
      });
    }
    if (+value < doorHeightInfluentMax && +value > doorHeightInfluentHandleMin) {
      onChange(dependentHandle, `${+value - 450}`);
    }
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
          getNumber={(value: string) =>
            onChange("doorWidth_X", {
              min: doorWidth_X.min,
              max: doorWidth_X.max,
              value: +value,
            })
          }
        />
        <NumericInput
          min={doorHeight_Y.min}
          max={doorHeight_Y.max}
          value={doorHeight_Y.value}
          label="Installation Height"
          className="inputAndLabel displayFlex width40percent"
          getNumber={(value: string) =>
            handleHeightChange(
              "doorHeight_Y",
              doorHeight_Y.min,
              doorHeight_Y.max,
              "hingeDownOverBottom_Y",
              hingeDownOverBottom_Y.min,
              "handleHeight_Y",
              value
            )
          }
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
              min: thresholdHeightVisible_Y.min,
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
              min: frameProfileWidthVisible_X.min,
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
              min: frameJumbVisible_Y.min,
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
              min: hingeUpUnderTop_Y.min,
              max: hingeUpUnderTop_Y.max,
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
              min: hingeDownOverBottom_Y.min,
              max: hingeDownOverBottom_Y.max,
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
            onChange("hingesCount", {
              value,
              displayName: hingesCount.displayName,
            })
          }
        />
        <Dropdown
          options={thirdHingePositionOptions}
          value={thirdHingePosition.value}
          label="Third Hinge Position"
          className="inputAndLabel displayFlex width40percent"
          onChange={(value: string) =>
            onChange("thirdHingePosition", {
              value,
              displayName: thirdHingePosition.displayName,
            })
          }
        />
      </div>

      <p>GLASING_TYPE = 'glasses_round_300_300' "Glasses_square_300_300"</p>
      <p>HANDLE_TYPE = 'square'; // ["square", "round","long"]</p>
      <p>
        ACTIVE_LEAF_WIDTH = 'exactlyHalf'; // ['number' as string
        ||'exactlyHalf']
      </p>
      <p>
        HANDLE: 'long_L','long_R', 'square_L', 'square_R', 'round_L', 'round_R'
      </p>
      <p>dinDirection: "Left", // "Left", "Right"</p>
    </div>
  );
};

export default ConfigureMenu;
