import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AvatarScene from "./AvatarScene";

// TODO: replace AvatarScene (placeholder sphere) with a loaded Ready Player Me
// .glb model using useGLTF from @react-three/drei once avatar is ready.
export default function AvatarViewer({ isSpeaking }) {
  return (
    <div className="w-full h-72 bg-darker border border-surfaceBorder rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0.5, 4], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={0.8} />
        <AvatarScene isSpeaking={isSpeaking} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
