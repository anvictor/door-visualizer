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
  activeLeafWidthOptions: OptionType[];
  activeLeafWidth_X: ActiveLeafType;
  closerMountedPosition: OptionType;
  doorHeight_Y: LimitedNumType;
  doorHeightInfluentMax_Y: number;
  doorHeightInfluentHandleMin_Y: number;
  doorHeightInfluentHingeMin_Y: number;
  doorHeightInfluent_Y: number;
  doorLeafColor: string;
  doorWidth_X: LimitedNumType;
  frameColor: string;
  frameJumbVisible_Y: LimitedNumType;
  frameJumb_Y: LimitedNumType;
  frameProfileWidthVisible_X: LimitedNumType;
  frameProfileWidth_X: LimitedNumType;
  glazingType: OptionType;
  handleHeight_Y: string;
  handleTypeString: string;
  hingeDownOverBottom_Y: LimitedNumType;
  hingeUpUnderTop_Y: LimitedNumType;
  hingesCount: OptionType;
  leafWidthMinForCloser_X: number;
  leafWidthMinForDouble_X: number;
  leafWidthMaxForDouble_X: number;
  leavesCount: OptionType;
  openDirection: OptionType;
  thirdHingePosition: OptionType;
  thresholdHeightVisible_Y: LimitedNumType;
  thresholdHeight_Y: LimitedNumType;
  useDoorCloser: boolean;
  useGlazing: boolean;
  useSecondCloser: boolean;
}

export type HandleFunctions = {
  [key: string]: () => number;
};
