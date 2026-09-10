import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// PLACEHOLDER avatar (a simple animated sphere "mouth") until Ready Player Me
// .glb model is integrated. isSpeaking prop drives basic scale animation to
// simulate mouth movement - swap this out for real morph-target lip-sync later.
export default function AvatarScene({ isSpeaking }) {
  const mouthRef = useRef();

  useFrame((state) => {
    if (mouthRef.current) {
      if (isSpeaking) {
        // simple oscillation to simulate talking
        const scale = 0.8 + Math.abs(Math.sin(state.clock.elapsedTime * 10)) * 0.4;
        mouthRef.current.scale.set(1, scale, 1);
      } else {
        mouthRef.current.scale.set(1, 0.8, 1);
      }
    }
  });

  return (
    <group>
      {/* Head */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#2563EB" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.35, 0.7, 0.85]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.35, 0.7, 0.85]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Mouth - animates when speaking */}
      <mesh ref={mouthRef} position={[0, 0.1, 0.9]}>
        <boxGeometry args={[0.4, 0.15, 0.1]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>
    </group>
  );
}
