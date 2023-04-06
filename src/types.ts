interface DoorSizeType {
  width: number;
  height: number;
}

interface DimensionsType {
    doorSize: DoorSizeType;
}

export interface ValuesProps {
  dimensions: DimensionsType;
  leavesCount: number;
  dinDirection: string;
  hingesCount: number;
  useGlazing: boolean;
  useDoorCloser: boolean;
  doorCloser: string;
  thirdHingePosition: string;
  handleHeight: number;
  frameColor: string;
  doorLeafColor: string;
}
