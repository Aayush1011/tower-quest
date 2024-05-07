import { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

// Drei is a really helpful library
// It has helpers for react-three-fiber
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

// Our main React component renders a Canvas from
// react-three-fiber. The Canvas component does most
// of the hard work of setting up the scene, renderer
// and other core components of Three.js
export default function ThreeCanvas({ children }: { children: ReactNode }) {
  return (
    <div>
      <Canvas style={{ height: "calc(90vh/2)", width: "calc(90vw/4)" }}>
        {/*
               A group is used for grouping, kind og like
              groups in SVGs. The positioning of elements
              inside a group is relative to the group's
              position.
            */}
        <group>
          {/* All these are in the same group */}
          {children}
        </group>
        {/* Let there be light! */}
        <ambientLight />
        <directionalLight color={0xffffff} position={[0, 0.5, 0]} />
        <directionalLight color={0xffffff} position={[1.5, 0.5, -1.5]} />

        {/*
              Use a PerspectiveCamera.
              PerspectiveCameras work like real works cameras
              and provide depth perception.
            */}
        <PerspectiveCamera position={[-4, 3.5, -3]} makeDefault />
        {/*
              This lets you rotate the camera.
              We've associated our React ref with it
              like we would do for any React component
            */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
