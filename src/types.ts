export interface LimitedNumType {
  min: number;
  max: number;
  value: number;
}

export interface OptionType {
  value: string;
  displayName: string;
}

export interface ActiveLeafType {
  min: number;
  max: number;
  value: number;
  type: string;
  displayName: string;
}

export interface ValuesType {
  activeLeafWidthOptions:OptionType[],
  activeLeafWidth_X: ActiveLeafType;
  openDirection: OptionType;
  doorCloser: string;
  doorLeafColor: string;
  frameColor: string;
  frameJumb_Y: LimitedNumType;
  frameJumbVisible_Y: LimitedNumType;
  frameProfileWidth_X: LimitedNumType;
  frameProfileWidthVisible_X: LimitedNumType;
  handleHeight_Y: string;
  hingesCount: OptionType;
  doorWidth_X: LimitedNumType;
  leavesCount: OptionType;
  thirdHingePosition: OptionType;
  thresholdHeight_Y: LimitedNumType;
  thresholdHeightVisible_Y: LimitedNumType;
  useDoorCloser: boolean;
  useGlazing: boolean;
  doorHeight_Y: LimitedNumType;
  hingeUpUnderTop_Y: LimitedNumType;
  hingeDownOverBottom_Y: LimitedNumType;
  handleTypeString: string;
}
