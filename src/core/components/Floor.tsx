import { DoubleSide, Mesh } from "three";

import { useRef } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectNonPersistentStates } from "../redux/non-persistent-states/non-persistent-states.selector";
import { shallowEqual } from "react-redux";
import { floorConfig } from "../utils/game-config";
import { FloorKeys } from "../utils/game-config.types";

// This is the thing we are interested in
// The GreenSquare component renders a mesh.
// Meshes are objects that can have a shape and
// texture.
export default function Floor({ currentFloor }: { currentFloor: number }) {
  const meshRef = useRef<Mesh>(null!);

  const { floor, bombSelected, gameStarted } = useAppSelector(
    selectNonPersistentStates,
    shallowEqual,
  );

  return (
    // The mesh is at the origin
    // Since it is inside a group, it is at the origin
    // of that group
    // It's rotated by 90 degrees along the X-axis
    // This is because, by default, planes are rendered
    // in the X-Y plane, where Y is the up direction
    <mesh
      position={[0, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[2, 2, 2]}
      ref={meshRef}
    >
      {/*
        The thing that gives the mesh its shape
        In this case the shape is a flat plane
      */}
      <planeGeometry />
      {/*
        The material gives a mesh its texture or look.
      */}
      <meshBasicMaterial
        color={
          (floor === currentFloor || bombSelected) && gameStarted
            ? floorConfig[currentFloor as FloorKeys].floorColor
            : 0xbebab7
        }
        side={DoubleSide}
      />
    </mesh>
  );
}

// The rest of the components are just tooltips
// Drei's Html component lets you render any HTML
// inside the 3d scene. It follows the same rules
// as everything else when it comes to positioning,
// but is not actually rendered inside the canvas
