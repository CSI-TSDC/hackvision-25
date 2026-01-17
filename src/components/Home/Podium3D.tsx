'use client';
import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface PodiumModelProps {
    modelPath: string;
    color?: string;
}

// Component for loading the OBJ model
function PodiumModel({ modelPath, color = '#FFD700' }: PodiumModelProps) {
    const obj = useLoader(OBJLoader, modelPath);
    const groupRef = useRef<THREE.Group>(null);

    const clonedObj = useMemo(() => {
        const clone = obj.clone();

        // Apply material with the specified color
        clone.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: color,
                    metalness: 0.6,
                    roughness: 0.3,
                });
            }
        });

        // Calculate bounding box and center/scale the model
        const box = new THREE.Box3().setFromObject(clone);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Scale to make podium larger and more visible
        const targetHeight = 6;
        const scale = targetHeight / size.y;
        clone.scale.setScalar(scale);

        // Center the model
        clone.position.x = -center.x * scale;
        clone.position.z = -center.z * scale;
        clone.position.y = -center.y * scale;
        // TIP: Add an offset to y here to move podium up/down, e.g., + 0.5

        return clone;
    }, [obj, color]);

    return (
        <group ref={groupRef}>
            <primitive object={clonedObj} />
        </group>
    );
}

// Fallback placeholder podium using basic geometry
function PlaceholderPodium({ color = '#FFD700' }: { color?: string }) {
    const meshRef = useRef<THREE.Group>(null);

    return (
        <group ref={meshRef}>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.5, 2, 1.5]} />
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
            </mesh>
        </group>
    );
}

interface Podium3DProps {
    modelPath?: string;
    className?: string;
    color?: string;
}

const Podium3D = ({
    modelPath = '/assets/home/Prizes/PODIUM.obj',
    className = "w-full h-[20vh]",
    color = '#FFD700'
}: Podium3DProps) => {
    return (
        <div className={`${className} relative`}>
            <Canvas
                // CAMERA SETTINGS:
                // position: [x, y, z] -> [Horizontal, Vertical, Zoom/Distance]
                // fov: Field of View (zoom level)
                camera={{ position: [0, .5, 3], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
            >
                {/* Lighting Settings */}
                <ambientLight intensity={0.8} />
                <OrbitControls enableZoom={false} enablePan={false} />
                {/* Main Light Position: [x, y, z] */}
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, 3, -5]} intensity={0.8} />
                <pointLight position={[0, 5, 0]} intensity={0.5} />

                {/* Rotating Podium */}
                <Suspense fallback={null}>
                    {modelPath ? (
                        <PodiumModel modelPath={modelPath} color={color} />
                    ) : (
                        <PlaceholderPodium color={color} />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Podium3D;
