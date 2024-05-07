import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectNonPersistentStates } from "../redux/non-persistent-states/non-persistent-states.selector";
import {
  resetGame,
  setAutoplayRounds,
  startAutoplay,
  startGame,
  stopAutoplay,
} from "../redux/non-persistent-states/non-persistent-states.slice";
import { shallowEqual } from "react-redux";

export default function Autoplay() {
  const [showAutoplay, setShowAutoplay] = useState<boolean>(false);
  const [rounds, setRounds] = useState<number>(1);
  const { autoplay, autoplayRounds, gameStarted } = useAppSelector(
    selectNonPersistentStates,
    shallowEqual,
  );
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (autoplay) {
      dispatch(stopAutoplay());
      dispatch(resetGame());
    } else {
      dispatch(startAutoplay());
      dispatch(startGame());
    }
  };

  return showAutoplay ? (
    <div className="flex items-center gap-x-3">
      <div className="flex items-center gap-x-2 w-fit justify-end">
        <label htmlFor="autoplay-rounds">Rounds?</label>
        <input
          className="border w-[30%]"
          type="number"
          name="autoplay-rounds"
          id="autoplay-rounds"
          disabled={autoplayRounds === "infinite"}
          value={rounds}
          min={1}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAutoplayRounds(parseInt(event.target.value, 10));
            setRounds(parseInt(event.target.value, 10));
          }}
        />
      </div>
      {/* <div className="flex items-center gap-x-2">
        <label htmlFor="infinite-autoplay">Infinite?</label>
        <input
          type="checkbox"
          name="infinite-autoplay"
          id="infinite-autoplay"
          checked={autoplayRounds === "infinite"}
          onClick={() => {
            if (autoplayRounds === "infinite") {
              setAutoplayRounds(rounds);
            } else {
              setAutoplayRounds("infinite");
            }
          }}
          onChange={(event) => {}}
          disabled={autoplay}
        />
      </div> */}

      <button
        className={`px-4 py-2 rounded-lg ${autoplay ? "bg-[#FFADAD]" : "bg-[#A0C3D2]"}`}
        onClick={handleClick}
      >
        {autoplay ? "Stop" : "Start"}
      </button>
      <button
        className="px-3 py-2 rounded-lg bg-[#E8A2A2]"
        onClick={() => setShowAutoplay(false)}
        disabled={gameStarted}
      >
        Cancel
      </button>
    </div>
  ) : (
    <button
      className="px-3 py-2 rounded-lg bg-[#F7D9C4]"
      onClick={() => setShowAutoplay(true)}
      disabled={gameStarted}
    >
      Autoplay
    </button>
  );
}
