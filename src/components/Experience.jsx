import { Environment, OrbitControls } from "@react-three/drei";
import { Model } from "./Model";
import { useControls } from "leva";

export const Experience = () => {
  const { position, scale } = useControls({
    position: [0, 0, 0],
    scale: [1, 1, 1],
  });
  return (
    <>
      <OrbitControls />

      <Model position={position} scale={scale} />
      <ambientLight intensity={0.5} />

      <Environment preset="city" />
    </>
  );
};
