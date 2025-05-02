import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export function Marker({ children, ...props }) {
  const ref = useRef();
  // This holds the local occluded state
  const [isOccluded, setOccluded] = useState(false);
  const [isInRange, setInRange] = useState(false);
  const isVisible = isInRange && !isOccluded;
  // Test distance
  const vec = new THREE.Vector3();
  // useFrame((state) => {
  //   const range =
  //     state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10;
  //   if (range !== isInRange) setInRange(range);
  // });
  return (
    <group ref={ref}>
      <Html
        transform
        // occlude
        // onOcclude={setOccluded}
        // style={{
        //   transition: "all 0.2s",
        //   opacity: isVisible ? 1 : 1,
        //   transform: `scale(${isVisible ? 1 : 0.25})`,
        // }}
        {...props}
      >
        {children}
      </Html>
    </group>
  );
}
