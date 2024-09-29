import { animated, useSpring, useSpringRef } from '@react-spring/three';
import { Html } from '@react-three/drei';
import { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import { Dictionary, Enemy as EnemyType, Position } from 'src/types';
import { OWNSHIP_RADIUS } from 'src/utils';

type EnemyProps = {
  enemy: EnemyType;
  pause: boolean;
  onCollision: () => void;
};

const Enemy = forwardRef(
  (
    { enemy, pause, onCollision }: EnemyProps,
    enemyPositions: Ref<Dictionary<Position>>
  ) => {
    const { initialPosition, targetPosition, word, attackIndex, delay, speed } =
      enemy;

    const springRef = useSpringRef();
    const refs = useRef<{
      timeoutId: NodeJS.Timeout | null;
      startTime: number | null;
      remainingDelay: number;
    }>({
      timeoutId: null,
      startTime: null,
      remainingDelay: delay,
    });

    const [animationStarted, setAnimationStarted] = useState<boolean>(false);

    const { x, y, z } = useSpring({
      from: {
        x: initialPosition.x,
        y: initialPosition.y,
        z: initialPosition.z,
      },
      to: { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z },
      config: {
        duration: speed,
      },
      ref: springRef,
      // delay,
      onStart: () => {
        if (!pause) {
          setAnimationStarted(true);
        }
      },
      onChange(result) {
        const { value, finished, cancelled } = result;
        const { x, y, z } = value;

        if (!enemyPositions || !enemyPositions.current[word]) return;

        // update position of enemy
        enemyPositions.current[word] = { x, y, z };

        // check for collision with ownship
        if (Math.abs(x) <= OWNSHIP_RADIUS && Math.abs(y) <= OWNSHIP_RADIUS) {
          onCollision();
        }
      },
    });

    useEffect(() => {
      if (!animationStarted) {
        if (pause) {
          if (!refs.current.timeoutId || !refs.current.startTime) return;

          const { timeoutId, startTime } = refs.current;
          clearTimeout(timeoutId);

          refs.current.remainingDelay = delay - (Date.now() - startTime);
        } else {
          const { remainingDelay } = refs.current;

          refs.current.startTime = Date.now();

          refs.current.timeoutId = setTimeout(
            () => springRef.start(),
            remainingDelay
          );
        }
      } else {
        if (pause) springRef.pause();
        else springRef.resume();
      }
    }, [animationStarted, pause]);

    return (
      <>
        {animationStarted && (
          <animated.mesh position-x={x} position-y={y} position-z={z}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshBasicMaterial color="white" />

            <Html
              style={{
                transform: 'translate(-50%, -50%)',
                fontSize: 24,
              }}
            >
              {attackIndex === 0 ? (
                <span style={{ color: 'black' }}>{word}</span>
              ) : (
                word.split('').map((letter, index) => (
                  <span
                    key={`${letter}-${index}`}
                    style={{
                      color: index < attackIndex ? 'grey' : 'red',
                    }}
                  >
                    {letter}
                  </span>
                ))
              )}
            </Html>
          </animated.mesh>
        )}
      </>
    );
  }
);

export default Enemy;
