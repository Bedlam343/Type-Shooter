import { Stars as DreiStars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

type StarsProps = {
  move?: boolean;
  speed?: 'slow' | 'medium' | 'fast';
};

function getSpeed(speed: string) {
  switch (speed) {
    case 'slow':
      return 0.003;
    case 'medium':
      return 0.007;
    case 'fast':
      return 0.01;
    default:
      return 0.003;
  }
}

const Stars = ({ move = false, speed = 'slow' }: StarsProps) => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (starsRef.current && move) {
      starsRef.current.rotation.y += delta * getSpeed(speed);
    }
  });

  return (
    <DreiStars
      ref={starsRef}
      radius={150}
      count={10_000}
      factor={6}
      saturation={0}
      fade={false}
    />
  );
};

export default Stars;
