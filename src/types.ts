export interface LimitedNumType {
  min: number;
  max: number;
  value: number;
}

export interface OptionType {
  value: string;
  displayName: string;
}

export interface ValuesType {
  dinDirection: OptionType;
  doorCloser: string;
  doorLeafColor: string;
  frameColor: string;
  frameJumb_Y: LimitedNumType;
  frameJumbVisible_Y: LimitedNumType;
  frameProfileWidth_X: LimitedNumType;
  frameProfileWidthVisible_X: LimitedNumType;
  handleHeight: string;
  hingesCount: OptionType;
  doorWidth_X: LimitedNumType;
  leavesCount: OptionType;
  thirdHingePosition: OptionType;
  treshHoldHeight_Y: LimitedNumType;
  treshHoldHeightVisible_Y: LimitedNumType;
  useDoorCloser: boolean;
  useGlazing: boolean;
  doorHeight_Y: LimitedNumType;
  hingeUpUnderTop_Y: LimitedNumType;
  hingeDownOverBottom_Y: LimitedNumType;
}
