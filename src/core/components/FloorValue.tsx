import { Html } from "@react-three/drei";

export default function FloorValue({ value }: { value: number }) {
  return (
    <Html center position={[1, 1, 1]}>
      <p className="px-3 py-2 rounded-lg bg-[#DFFDFF] w-fit h-fit whitespace-nowrap text-sm">
        Floor {value}
      </p>
    </Html>
  );
}
