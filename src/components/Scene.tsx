"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FloatingShape = ({ color, position, speed, rotationSpeed }: { color: string; position: [number, number, number]; speed: number; rotationSpeed: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const isSphere = Math.random() > 0.5;

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        meshRef.current.position.y += Math.sin(t * speed) * 0.002;
        meshRef.current.rotation.x += rotationSpeed;
        meshRef.current.rotation.y += rotationSpeed;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                {isSphere ? <sphereGeometry args={[0.5, 32, 32]} /> : <torusGeometry args={[0.4, 0.2, 16, 100]} />}
                <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
            </mesh>
        </Float>
    );
};

const HeroScene = () => {
    const shapes = useMemo(() => {
        const colors = ["#ed6b06", "#504d47", "#f5f1ed"];
        return Array.from({ length: 25 }).map((_, i) => {
            // Ensure shapes are not blocking the center
            const x = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10 - 5; // Move them slightly further back

            // Push away from center if too close
            const adjustedX = Math.abs(x) < 2 ? (x < 0 ? x - 2 : x + 2) : x;
            const adjustedY = Math.abs(y) < 2 ? (y < 0 ? y - 2 : y + 2) : y;

            return {
                color: colors[i % colors.length],
                position: [adjustedX, adjustedY, z] as [number, number, number],
                speed: Math.random() + 0.5,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
            };
        });
    }, []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="city" />
            {shapes.map((shape, i) => (
                <FloatingShape key={i} {...shape} />
            ))}
        </>
    );
};

const MetallicLogoScene = () => {
    // Keep it clean for the metallic assembly section
    return (
        <group>
            <Environment preset="city" />
            <ambientLight intensity={1} />
            <pointLight position={[5, 5, 5]} />
        </group>
    );
};

const Scene = ({ scrollYProgress, isHero }: { scrollYProgress: any; isHero: boolean }) => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
                {isHero ? (
                    <HeroScene />
                ) : (
                    <MetallicLogoScene />
                )}
            </Canvas>
        </div>
    );
};

export default Scene;
