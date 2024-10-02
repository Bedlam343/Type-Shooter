import * as THREE from 'three';
import { OWNSHIP_POSITION, OWNSHIP_RADIUS } from 'src/utils';
import { useLoader } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';

const Ownship = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const { x, y, z } = OWNSHIP_POSITION;

  const texture = useLoader(THREE.TextureLoader, './planet.png');

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = -1.5;
  }, []);

  return (
    <mesh ref={meshRef} position={[x, y, z]}>
      <sphereGeometry args={[OWNSHIP_RADIUS]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default Ownship;
