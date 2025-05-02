import { Html, Outlines, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

export const Model = (props) => {
  const { nodes, materials } = useGLTF("/earth.gltf");
  const [hoveredMesh, setHoveredMesh] = useState(null);

  const modelRef = useRef(null);

  // References to meshes
  const iceMeshRef = useRef();
  const waterMeshRef = useRef();
  const landMeshRef = useRef();

  // Access Three.js context
  const { camera, raycaster, pointer } = useThree();

  // Set up raycaster
  useEffect(() => {
    raycaster.set(new THREE.Vector3(), new THREE.Vector3());
  }, [raycaster]);

  // Handle pointer move to detect hovered mesh
  const handlePointerMove = () => {
    // Update raycaster with pointer position
    raycaster.setFromCamera(pointer, camera);

    // List of meshes to check for intersections
    const meshes = [
      iceMeshRef.current,
      waterMeshRef.current,
      landMeshRef.current,
    ].filter(Boolean);

    // Find intersections
    const intersects = raycaster.intersectObjects(meshes);

    // Set hovered mesh based on the first intersection
    if (intersects.length > 0) {
      const closestMesh = intersects[0].object;
      if (closestMesh === iceMeshRef.current) {
        setHoveredMesh("Lampd_Ice");
      } else if (closestMesh === waterMeshRef.current) {
        setHoveredMesh("watr");
      } else if (closestMesh === landMeshRef.current) {
        setHoveredMesh("Lampd");
      }
    } else {
      setHoveredMesh(null);
    }
  };

  useFrame((_, delta) => {
    modelRef.current.rotation.z += delta * 0.3;
  });

  return (
    <group
      ref={modelRef}
      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      {...props}
      dispose={null}
      onPointerMove={handlePointerMove}
    >
      {/* Ice Mesh */}
      <mesh
        ref={iceMeshRef}
        geometry={nodes["URF-Height_Lampd_Ice_0"].geometry}
        material={materials.Lampd_Ice}
      >
        {hoveredMesh === "Lampd_Ice" && (
          <>
            <Html
              position={[0, 0, 1.5]}
              rotation={[0, Math.PI / 2, Math.PI / 2]}
              transform
              distanceFactor={10}
              style={{
                background: "white",
                padding: "4px 4px",
                borderRadius: "4px",
                fontSize: "10px",
                fontFamily: "Arial",
              }}
            >
              Ice
            </Html>
            <Outlines thickness={4} color="cyan" />
          </>
        )}
      </mesh>

      {/* Water Mesh */}
      <mesh
        ref={waterMeshRef}
        geometry={nodes["URF-Height_watr_0"].geometry}
        material={materials.watr}
      >
        {hoveredMesh === "watr" && (
          <>
            <Html
              position={[0, 0, 1.5]}
              rotation={[0, Math.PI / 2, Math.PI / 2]}
              transform
              distanceFactor={10}
              style={{
                background: "white",
                padding: "4px 4px",
                borderRadius: "4px",
                fontSize: "10px",
                fontFamily: "Arial",
              }}
            >
              Water
            </Html>
            <Outlines thickness={4} color="blue" />
          </>
        )}
      </mesh>

      {/* Land Mesh */}
      <mesh
        ref={landMeshRef}
        geometry={nodes["URF-Height_Lampd_0"].geometry}
        material={materials.Lampd}
      >
        {hoveredMesh === "Lampd" && (
          <>
            <Html
              position={[0, 0, 1.5]}
              rotation={[0, Math.PI / 2, Math.PI / 2]}
              transform
              distanceFactor={10}
              style={{
                background: "white",
                padding: "4px 4px",
                borderRadius: "4px",
                fontSize: "10px",
                fontFamily: "Arial",
              }}
            >
              Land
            </Html>
            <Outlines thickness={4} color="green" />
          </>
        )}
      </mesh>
    </group>
  );
};

useGLTF.preload("/earth.gltf");
