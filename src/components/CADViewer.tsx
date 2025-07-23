'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Box3, Vector3 } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  scale?: number;
}

function Model({ url, scale = 1 }: ModelProps) {
  const { scene } = useGLTF(url);
  const { camera } = useThree();
  const meshRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (meshRef.current) {
      const box = new THREE.Box3().setFromObject(meshRef.current);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera instanceof THREE.PerspectiveCamera ? camera.fov : 50;
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov * Math.PI / 180 / 2));
      
      cameraZ *= 1.5;
      
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.position.set(center.x, center.y, center.z + cameraZ);
        camera.lookAt(center);
        camera.near = cameraZ / 100;
        camera.far = cameraZ * 100;
        camera.updateProjectionMatrix();
      }
    }
  }, [scene, camera]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

interface CADViewerProps {
  modelUrl?: string;
  width?: string;
  height?: string;
  showControls?: boolean;
}

export default function CADViewer({
  modelUrl,
  width = '100%',
  height = '400px',
  showControls = true
}: CADViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (modelUrl) {
      setIsLoading(false);
    } else {
      setError('No model URL provided');
      setIsLoading(false);
    }
  }, [modelUrl]);

  if (error) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <div className="text-gray-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Interactive CAD Viewer</p>
          <p className="text-sm text-gray-500">Upload STP/GLTF files to view 3D models</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading 3D Model...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="rounded-lg overflow-hidden bg-gray-50 border"
      style={{ width, height }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true }}
        shadows
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        {modelUrl && <Model url={modelUrl} />}
        
        {showControls && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={0.1}
            maxDistance={1000}
            zoomSpeed={0.5}
          />
        )}
      </Canvas>
      
      {showControls && (
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          Click and drag to rotate • Scroll to zoom
        </div>
      )}
    </div>
  );
}

useGLTF.preload('/models/bypass-engine_asm.gltf');
useGLTF.preload('/models/BoilerBus.gltf');