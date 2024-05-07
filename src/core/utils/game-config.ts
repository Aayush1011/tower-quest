import { IDifficultyConfig, IFloorConfig } from "./game-config.types";

export enum floorDifficulty {
  NORMAL = "normal",
  MEDIUM = "medium",
  HARD = "hard",
  IMPOSSIBLE = "impossible",
}

export const difficultyConfig: IDifficultyConfig = {
  [floorDifficulty.NORMAL]: {
    numberOfBoxes: 4,
    totalGems: 3,
    totalBombs: 1,
  },
  [floorDifficulty.MEDIUM]: {
    numberOfBoxes: 3,
    totalGems: 2,
    totalBombs: 1,
  },
  [floorDifficulty.HARD]: {
    numberOfBoxes: 3,
    totalGems: 1,
    totalBombs: 2,
  },
  [floorDifficulty.IMPOSSIBLE]: {
    numberOfBoxes: 4,
    totalGems: 1,
    totalBombs: 3,
  },
};

export const floorConfig: IFloorConfig = {
  1: { floorColor: 0xfaedcb },
  2: { floorColor: 0xdbcdf0 },
  3: { floorColor: 0xf7d9c4 },
  4: { floorColor: 0xfdffb6 },
  5: { floorColor: 0xffd6a5 },
  6: { floorColor: 0xdfebeb },
  7: { floorColor: 0x9ea1d4 },
  8: { floorColor: 0xf1f7b5 },
};

export const floorInitialState = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
};
