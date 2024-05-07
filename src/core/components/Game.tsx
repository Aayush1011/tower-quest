import { useEffect } from "react";
import Box from "./Box";
import Floor from "./Floor";
import ThreeCanvas from "./ThreeCanvas";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectNonPersistentStates } from "../redux/non-persistent-states/non-persistent-states.selector";
import {
  assignAsBomb,
  assignAsGem,
  resetBoxBombs,
  resetGame,
  selectAutoplayBox,
  setGameStateLoaded,
  stopAutoplay,
} from "../redux/non-persistent-states/non-persistent-states.slice";
import GameStatus from "./GameStatus";
import Loader from "./Loader";
import { FloorKeys, IndexValues } from "../utils/game-config.types";
import { selectPersistentStates } from "../redux/persistent-states/persistent-states.selector";
import FloorValue from "./FloorValue";

export default function Game() {
  const {
    gameStateLoaded,
    gameStarted,
    round,
    autoplay,
    autoplayRounds,
    floor,
  } = useAppSelector(selectNonPersistentStates);

  const { numberOfBoxes, totalBombs, difficulty } = useAppSelector(
    selectPersistentStates,
  );

  const dispatch = useAppDispatch();

  const randomBoxIndex = (length: number) => Math.floor(Math.random() * length);

  useEffect(() => {
    dispatch(resetBoxBombs());

    for (let j = 1; j <= 8; j++) {
      const boxesToAssign = Array.from(Array(numberOfBoxes).keys());
      for (let i = 0; i < totalBombs; i++) {
        const boxAsBomb = randomBoxIndex(boxesToAssign.length);
        dispatch(
          assignAsBomb({
            floor: j as FloorKeys,
            box: boxesToAssign[boxAsBomb],
          }),
        );
        boxesToAssign.splice(boxAsBomb, 1);
      }
    }

    dispatch(assignAsGem(numberOfBoxes));
    dispatch(setGameStateLoaded());
  }, [difficulty, gameStarted]);

  useEffect(() => {
    if (
      autoplay &&
      autoplayRounds !== "infinite" &&
      round === autoplayRounds + 1
    ) {
      dispatch(stopAutoplay());
      dispatch(resetGame());
    }
  }, [round, autoplay]);

  useEffect(() => {
    if (autoplay) {
      dispatch(selectAutoplayBox(randomBoxIndex(numberOfBoxes) as IndexValues));
    }
  }, [autoplay, floor]);

  return (
    <div className="w-full">
      <GameStatus />
      <div className="w-full grid grid-cols-4 grid-rows-2">
        {Array.from(Array(8).keys()).map((floorValue) => (
          <ThreeCanvas key={floorValue}>
            {gameStateLoaded ? (
              <>
                <FloorValue value={floorValue + 1} />
                {Array.from(Array(numberOfBoxes).keys()).map((value) => (
                  <Box
                    index={value as IndexValues}
                    boxFloor={floorValue + 1}
                    key={value}
                  />
                ))}
                <Floor currentFloor={floorValue + 1} />
              </>
            ) : (
              <Loader />
            )}
          </ThreeCanvas>
        ))}
      </div>
    </div>
  );
}
