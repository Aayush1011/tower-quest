import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { floorInitialState } from "../../utils/game-config";
import {
  FloorKeys,
  IIsBoxBomb,
  IndexValues,
} from "../../utils/game-config.types";

interface INonPersistentState {
  floor: FloorKeys;
  bombSelected: boolean;
  boxClicked: boolean;
  showBoxValue: boolean;
  gameStateLoaded: boolean;
  round: number;
  isBoxBomb: IIsBoxBomb;
  gameStarted: boolean;
  autoplay: boolean;
  autoplayBoxChosen?: IndexValues;
  autoplayRounds: number | "infinite";
}

const initialState: INonPersistentState = {
  floor: 1,
  bombSelected: false,
  boxClicked: false,
  showBoxValue: false,
  gameStateLoaded: false,
  round: 1,
  isBoxBomb: floorInitialState,
  gameStarted: false,
  autoplay: false,
  autoplayBoxChosen: undefined,
  autoplayRounds: 1,
};

const nonPersistentStateSlice = createSlice({
  name: "nonPersistentStates",
  initialState,
  reducers: {
    nextFloor: (state) => {
      if (state.floor === 8) {
        state.round += 1;
        state.floor = 1;
      } else {
        state.floor += 1;
      }
    },
    resetGame: (state) => {
      state.floor = 1;
      state.round = 1;
      state.gameStarted = false;
      state.autoplay = false;
      state.autoplayBoxChosen = undefined;
      state.autoplayRounds = 1;
      state.bombSelected = false;
    },
    assignAsBomb: (
      state,
      action: PayloadAction<{ floor: FloorKeys; box: number }>,
    ) => {
      state.isBoxBomb[action.payload.floor][action.payload.box] = true;
    },
    assignAsGem: (state, action: PayloadAction<number>) => {
      for (let i = 1; i <= 8; i++) {
        for (let j = 0; j < action.payload; j++) {
          if (!state.isBoxBomb[i as FloorKeys][j]) {
            state.isBoxBomb[i as FloorKeys][j] = false;
          }
        }
      }
    },
    setBombSelected: (state) => {
      state.bombSelected = true;
    },
    setBoxClicked: (state) => {
      state.boxClicked = true;
    },
    resetBoxClicked: (state) => {
      state.boxClicked = false;
    },
    setGameStateLoaded: (state) => {
      state.gameStateLoaded = true;
    },
    startGame: (state) => {
      state.gameStarted = true;
    },
    stopGame: (state) => {
      state.gameStarted = false;
    },
    resetBoxBombs: (state) => {
      state.isBoxBomb = floorInitialState;
    },
    startAutoplay: (state) => {
      state.autoplay = true;
    },
    stopAutoplay: (state) => {
      state.autoplay = false;
    },
    selectAutoplayBox: (state, action: PayloadAction<IndexValues>) => {
      state.autoplayBoxChosen = action.payload;
    },
    setAutoplayRounds: (state, action: PayloadAction<number | "infinite">) => {
      state.autoplayRounds = action.payload;
    },
  },
});

export const nonPersistentStatesActions = nonPersistentStateSlice.actions;

export const {
  nextFloor,
  resetGame,
  assignAsBomb,
  assignAsGem,
  setBombSelected,
  setBoxClicked,
  resetBoxClicked,
  setGameStateLoaded,
  startGame,
  resetBoxBombs,
  startAutoplay,
  stopAutoplay,
  selectAutoplayBox,
  setAutoplayRounds,
  stopGame,
} = nonPersistentStateSlice.actions;

export default nonPersistentStateSlice.reducer;
