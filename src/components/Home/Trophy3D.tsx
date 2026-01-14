'use client';
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Component for loading a 3D model
function TrophyModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  React.useEffect(() => {
    if (!scene || !groupRef.current) return;

    // Clone the scene to avoid mutating the original
    const clonedScene = scene.clone();
    modelRef.current = clonedScene;

    // Calculate bounding box on the original scene
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Scale to make trophy height approximately 2.6 units (balanced size)
    const targetHeight = 2.6;
    const scale = targetHeight / size.y;
    clonedScene.scale.setScalar(scale);

    // Center the model
    clonedScene.position.x = -center.x * scale;
    clonedScene.position.z = -center.z * scale;
    clonedScene.position.y = -center.y * scale;

    // Add to group
    const group = groupRef.current;
    group.add(clonedScene);

    return () => {
      if (group && clonedScene) {
        group.remove(clonedScene);
      }
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 1;
    }
  });

  return <group ref={groupRef} />;
}

// Component for the placeholder trophy
function PlaceholderTrophy() {
  const meshRef = useRef<THREE.Group>(null);

  // Rotate the trophy horizontally around its own axis
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.7; // Adjust speed here (0.5 = moderate speed)
    }
  });

  return (
    <group ref={meshRef}>
      {/* Trophy base */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Trophy stem */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Trophy cup */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.8, 1, 1.2, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Trophy handles */}
      <mesh position={[-1, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

const Trophy3D = ({ modelPath, className = "w-full h-[45vh]" }: { modelPath?: string, className?: string }) => {
  return (
    <div className={`${className} relative`}>
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 3, -5]} intensity={0.8} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        {/* Rotating Trophy */}
        <Suspense fallback={null}>
          {modelPath ? (
            <TrophyModel modelPath={modelPath} />
          ) : (
            <PlaceholderTrophy />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Trophy3D;

