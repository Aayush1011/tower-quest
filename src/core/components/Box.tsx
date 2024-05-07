import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import { animated } from "@react-spring/three";
import { config, useSpring } from "@react-spring/web";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectNonPersistentStates } from "../redux/non-persistent-states/non-persistent-states.selector";
import {
  nextFloor,
  resetBoxClicked,
  setBombSelected,
  setBoxClicked,
} from "../redux/non-persistent-states/non-persistent-states.slice";
import { getPosition } from "../utils/position-config";
import { FloorKeys, IndexValues } from "../utils/game-config.types";
import { selectPersistentStates } from "../redux/persistent-states/persistent-states.selector";
import { setBoxPosition } from "../redux/persistent-states/persistent-states.slice";

export interface IBox {
  index: IndexValues;
  boxFloor: number;
}

export default function Box({ index, boxFloor }: IBox) {
  const [clicked, setClicked] = useState<boolean>(false);
  const meshRef = useRef<Mesh>(null!);

  const {
    isBoxBomb,
    floor,
    gameStarted,
    bombSelected,
    round,
    autoplayBoxChosen,
    autoplay,
    boxClicked,
  } = useAppSelector(selectNonPersistentStates);
  const { difficulty, boxPosition } = useAppSelector(selectPersistentStates);
  const dispatch = useAppDispatch();

  const initialRotation = [0, 0, 0];
  const finalRotation = [Math.PI * 8, 0, 0];
  const defaultColor = 0x00ddff;
  const bombColor = 0xffadad;
  const gemColor = 0xc5dbc4;

  const [{ rotation, color }, api] = useSpring(() => ({
    rotation: initialRotation,
    color: defaultColor,
    config: config.wobbly,
  }));

  const boxAnimation = () => {
    api.start({
      from: {
        rotation: [
          meshRef.current.rotation.x,
          meshRef.current.rotation.y,
          meshRef.current.rotation.z,
        ],
        color: defaultColor,
      },
      to: {
        rotation: finalRotation,
        color: isBoxBomb[boxFloor as FloorKeys][index] ? bombColor : gemColor,
      },
    });
  };

  const handleClick = () => {
    if (!clicked && !boxClicked && floor === boxFloor) {
      setClicked(true);
      dispatch(setBoxClicked());
      boxAnimation();
      setTimeout(() => {
        if (isBoxBomb[boxFloor][index]) {
          dispatch(setBombSelected());
        } else {
          dispatch(nextFloor());
        }
        dispatch(resetBoxClicked());
      }, 2500);
    }
  };

  useEffect(() => {
    setClicked(false);
    if (gameStarted && floor === boxFloor) {
      api.set({ rotation: initialRotation, color: defaultColor });
    }
    if (!gameStarted || floor !== boxFloor) {
      api.set({ rotation: initialRotation, color: 0xbebab7 });
    }
  }, [floor, gameStarted]);

  useEffect(() => {
    if (bombSelected && !clicked) {
      setClicked(true);
      boxAnimation();
    }
  }, [bombSelected]);

  useEffect(() => {
    dispatch(
      setBoxPosition({
        floor: boxFloor as FloorKeys,
        index,
        position: getPosition(index)!,
      }),
    );
  }, [round, difficulty]);

  useEffect(() => {
    if (autoplay && index === autoplayBoxChosen) {
      handleClick();
    }
  }, [autoplay, autoplayBoxChosen]);

  return (
    <animated.mesh
      position={
        boxPosition[boxFloor as FloorKeys][index] as [
          x: number,
          y: number,
          z: number,
        ]
      }
      // @ts-expect-error: Spring type is Vector3 Type (Typescript return error on rotation)
      rotation={rotation}
      scale={[0.4, 0.4, 0.4]}
      onClick={handleClick}
      speed={0.5}
      ref={meshRef}
    >
      <boxGeometry />
      {/* @ts-expect-error: Spring type is number Type (Typescript return error on color) */}
      <animated.meshPhongMaterial color={color} />
    </animated.mesh>
  );
}
