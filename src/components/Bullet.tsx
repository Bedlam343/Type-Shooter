import { animated, useSpring } from '@react-spring/three';
import { Bullet as BulletType } from 'src/types';

type BulletProps = {
  bullet: BulletType;
  onImpact: (id: string) => void;
};

const Bullet = ({ bullet, onImpact }: BulletProps) => {
  const { initialPosition, targetPosition, id } = bullet;
  const { x, y, z } = useSpring({
    from: { x: initialPosition.x, y: initialPosition.y, z: initialPosition.z },
    to: { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z },
    config: {
      duration: 250,
    },
    onRest: () => onImpact(id),
  });

  return (
    <animated.mesh position-x={x} position-y={y} position-z={z}>
      <boxGeometry args={[0.05, 0.2, 1]} />
      <meshBasicMaterial color="skyblue" />
    </animated.mesh>
  );
};

export default Bullet;
