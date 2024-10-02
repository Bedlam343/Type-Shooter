import { Stars as DreiStars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

type StarsProps = {
  move?: boolean;
};

const Stars = ({ move = false }: StarsProps) => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (starsRef.current && move) {
      starsRef.current.rotation.y += delta * 0.003;
    }
  });

  return (
    <DreiStars
      ref={starsRef}
      radius={100}
      count={10_000}
      factor={6}
      saturation={0}
      fade={false}
    />
  );
};

export default Stars;
