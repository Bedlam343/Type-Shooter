import { animated, useSpring } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { Bullet as BulletType } from 'src/types';

const AnimatedRigidBody = animated(RigidBody);

type BulletProps = {
  bullet: BulletType;
  onImpact: (id: string) => void;
};

const Bullet = ({ bullet, onImpact }: BulletProps) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  const { initialPosition, targetPosition, id } = bullet;
  const { x, y, z } = useSpring({
    from: { x: initialPosition.x, y: initialPosition.y, z: initialPosition.z },
    to: { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z },
    config: {
      duration: 1000,
    },

    onRest: () => onImpact(id),
  });

  useFrame(() => {
    rigidBodyRef.current?.setNextKinematicTranslation({
      x: x.get(),
      y: y.get(),
      z: z.get(),
    });
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="kinematicPosition"
      collisionGroups={0x0001}
      position={[initialPosition.x, initialPosition.y, initialPosition.z]}
      colliders="hull"
      ccd={true}
    >
      <mesh>
        <boxGeometry args={[0.05, 0.2, 1]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </RigidBody>
  );
};

export default Bullet;
