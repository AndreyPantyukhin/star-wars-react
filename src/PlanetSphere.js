import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function Sphere({ textureUrl }) {
  // useLoader загрузит текстуру и вернёт её, реактивно отслеживая состояние
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function PlanetSphere({ textureUrl }) {
  return (
    <Canvas style={{ height: 400, width: 400 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere textureUrl={textureUrl} />
      <OrbitControls enableZoom={true} />
      <Stars />
    </Canvas>
  );
}

export default PlanetSphere;
