import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  FloorKeys,
  IBoxPosition,
  IDifficultyProps,
  IndexValues,
} from "../../utils/game-config.types";
import { floorDifficulty, floorInitialState } from "../../utils/game-config";
import { difficultyConfig } from "../../utils/game-config";

interface IPersistentState extends IDifficultyProps {
  difficulty: floorDifficulty;
  boxPosition: IBoxPosition;
}

const initialState: IPersistentState = {
  ...difficultyConfig[floorDifficulty.NORMAL],
  difficulty: floorDifficulty.NORMAL,
  boxPosition: floorInitialState,
};

const persistentStateSlice = createSlice({
  name: "persistent-states",
  initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<floorDifficulty>) => {
      state.difficulty = action.payload;
      const newFloorConfig = difficultyConfig[action.payload];
      Object.entries(newFloorConfig).forEach(([key, value]) => {
        state[key as keyof IDifficultyProps] = value;
      });
    },
    setBoxPosition: (
      state,
      action: PayloadAction<{
        floor: FloorKeys;
        index: IndexValues;
        position: number[];
      }>,
    ) => {
      state.boxPosition[action.payload.floor][action.payload.index] =
        action.payload.position;
    },
  },
});

export const persistentStatesActions = persistentStateSlice.actions;

export const { setDifficulty, setBoxPosition } = persistentStateSlice.actions;
export default persistentStateSlice.reducer;
