import { floorDifficulty } from "./game-config";

export type IDifficultyConfig = {
  [key in floorDifficulty]: IDifficultyProps;
};

export interface IDifficultyProps {
  numberOfBoxes: 3 | 4;
  totalGems: 1 | 2 | 3;
  totalBombs: 1 | 2 | 3;
}

export interface IFloorProps {
  floorColor: number;
}

export type FloorKeys = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type IndexValues = 0 | 1 | 2 | 3;

export type IFloorConfig = {
  [key in FloorKeys]: IFloorProps;
};

export type IIsBoxBomb = {
  [key in FloorKeys]: boolean[];
};

export type IBoxPosition = {
  [key in FloorKeys]: number[][];
};
