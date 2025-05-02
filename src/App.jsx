import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Loader, Stars } from "@react-three/drei";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Loader />
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
        <color attach="background" args={["#12071f"]} />
        <Suspense fallback={null}>
          <Experience />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={2}
          />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
