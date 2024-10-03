import { useFrame } from '@react-three/fiber';
import { useRef, Ref } from 'react';
import { Dictionary, Position } from 'src/types';
import * as THREE from 'three';

type LaserProps = {
  source: Position;
  target: string | undefined;
  enemyPositions: Ref<Dictionary<Position>>;
};

const Laser = ({ source, target, enemyPositions }: LaserProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current || !target) return;

    // @ts-expect-error ...
    const targetPos = enemyPositions?.current[target];
    if (!targetPos) return;

    const sourceVect = new THREE.Vector3(source.x, source.y, source.z);
    const targetVect = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);

    const midpoint = new THREE.Vector3()
      .addVectors(sourceVect, targetVect)
      .multiplyScalar(0.5);
    const distance = sourceVect.distanceTo(targetVect);
    const direction = new THREE.Vector3().subVectors(targetVect, sourceVect);
    const angle = Math.atan2(direction.y, direction.x);

    meshRef.current.position.set(midpoint.x, midpoint.y, 0);
    meshRef.current.scale.set(distance, 1, 1);
    meshRef.current.rotation.set(0, 0, angle);
  });

  if (!target) return null;

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 0.5, 0]} />
      <meshBasicMaterial color="lightskyblue" />
    </mesh>
  );
};

export default Laser;
