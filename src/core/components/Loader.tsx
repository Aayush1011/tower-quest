import { Html } from "@react-three/drei";

export default function Loader() {
  return (
    <Html center position={[0, 0, 0]}>
      <button
        type="button"
        className="bg-indigo-500 px-3 py-2 rounded"
        disabled
      >
        Loading...
      </button>
    </Html>
  );
}
