import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectNonPersistentStates } from "../redux/non-persistent-states/non-persistent-states.selector";
import {
  resetGame,
  startGame,
} from "../redux/non-persistent-states/non-persistent-states.slice";
import { selectPersistentStates } from "../redux/persistent-states/persistent-states.selector";
import { setDifficulty } from "../redux/persistent-states/persistent-states.slice";
import { floorDifficulty } from "../utils/game-config";
import Autoplay from "./Autoplay";

export default function GameStatus() {
  const { floor, round, gameStarted, autoplay } = useAppSelector(
    selectNonPersistentStates,
  );
  const { totalBombs, totalGems, difficulty } = useAppSelector(
    selectPersistentStates,
  );
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (gameStarted) {
      dispatch(resetGame());
    } else {
      dispatch(startGame());
    }
  };

  return (
    <div className="flex justify-between items-center px-5 py-4 border-b ">
      <div className="flex items-center gap-x-5">
        <p>Round: {round}</p>
        <p>Floor: {floor}</p>
        <p>Gems: {totalGems}</p>
        <p>Bombs: {totalBombs}</p>
        <div className="flex items-center gap-x-3">
          <label htmlFor="difficulty">Select difficulty: </label>
          <select
            name="difficulty"
            id="difficulty"
            className="capitalize"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              dispatch(setDifficulty(event.target.value as floorDifficulty))
            }
            value={difficulty}
          >
            <option value={floorDifficulty.NORMAL}>
              {floorDifficulty.NORMAL}
            </option>
            <option value={floorDifficulty.MEDIUM}>
              {floorDifficulty.MEDIUM}
            </option>
            <option value={floorDifficulty.HARD}>{floorDifficulty.HARD}</option>
            <option value={floorDifficulty.IMPOSSIBLE}>
              {floorDifficulty.IMPOSSIBLE}
            </option>
          </select>
        </div>
      </div>
      <div className="flex gap-x-4">
        <Autoplay />
        <button
          className={`${gameStarted ? "bg-[#F2C6DE]" : "bg-[#C9E4DE]"} px-3 py-2 rounded-lg`}
          onClick={handleClick}
          disabled={autoplay}
        >
          {gameStarted ? "New Game" : "Start Game"}
        </button>
      </div>
    </div>
  );
}
