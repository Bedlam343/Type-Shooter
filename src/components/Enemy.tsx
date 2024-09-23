import { animated, useSpring } from '@react-spring/three';
import { Html, Text } from '@react-three/drei';
import { forwardRef, Ref, useState } from 'react';
import { Enemy as EnemyType, Position } from 'src/types';

type EnemyProps = {
  enemy: EnemyType;
};

const Enemy = forwardRef(
  ({ enemy }: EnemyProps, ref: Ref<{ [key: string]: Position }>) => {
    const [animatedStarted, setAnimationStarted] = useState<boolean>(false);

    const { initialPosition, targetPosition, word, attackIndex, delay, speed } =
      enemy;

    const { x, y, z } = useSpring({
      from: {
        x: initialPosition.x,
        y: initialPosition.y,
        z: initialPosition.z,
      },
      to: { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z },
      config: {
        duration: 60000 / speed, // 60 seconds
      },
      delay,
      onStart: () => setAnimationStarted(true),
    });

    // update position
    // @ts-expect-error ...
    // ref.current[enemy.word[0]] = { x: x.get(), y: y.get(), z: z.get() };

    return (
      <>
        {animatedStarted && (
          <animated.mesh position-x={x} position-y={y} position-z={z}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshBasicMaterial color="white" />

            <Html
              style={{
                transform: 'translate(-50%, -50%)',
                fontSize: 24,
              }}
            >
              {attackIndex === 0
                ? word
                : word.split('').map((letter, index) => (
                    <span
                      key={`${letter}-${index}`}
                      style={{
                        color: index < attackIndex ? 'grey' : 'red',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
            </Html>
          </animated.mesh>
        )}
      </>
    );
  }
);

export default Enemy;
