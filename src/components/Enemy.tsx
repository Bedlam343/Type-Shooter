import { animated, useSpring } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { Enemy as EnemyType } from 'src/types';

type EnemyProps = {
  enemy: EnemyType;
};

const Enemy = ({ enemy }: EnemyProps) => {
  const { initialPosition, targetPosition } = enemy;
  const { x, y, z } = useSpring({
    from: { x: initialPosition.x, y: initialPosition.y, z: initialPosition.z },
    to: { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z },
    config: {
      duration: 20000, // 20 seconds
    },
  });

  return (
    <>
      <animated.mesh position-x={x} position-y={y} position-z={z}>
        <Text fontSize={0.2} color="white">
          {enemy.word}
        </Text>
      </animated.mesh>

      <animated.mesh position-x={x} position-y={y} position-z={z}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="brown" />
      </animated.mesh>
    </>
  );
};

export default Enemy;
