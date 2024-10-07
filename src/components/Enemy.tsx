import { animated, useSpring, useSpringRef } from '@react-spring/three';
import { Html } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { forwardRef, Ref, useEffect, useMemo, useRef, useState } from 'react';
import { Dictionary, Enemy as EnemyType, Position } from 'src/types';
import { OWNSHIP_RADIUS } from 'src/utils';
import { randomNumber } from 'src/utils/helpers';

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
        const { value } = result;
        const { x, y, z } = value;

        // @ts-expect-error ...
        if (!enemyPositions || !enemyPositions.current[word]) return;

        // update position of enemy
        // @ts-expect-error ...
        enemyPositions.current[word] = { x, y, z };

        // check for collision with ownship
        if (Math.abs(x) <= OWNSHIP_RADIUS && Math.abs(y) <= OWNSHIP_RADIUS) {
          onCollision();
        }
      },
    });

    const shipNumber = useMemo(() => randomNumber(1, 9), []);

    const texture = useLoader(
      THREE.TextureLoader,
      `./ships/ship_${shipNumber}.png`
    );

    const rotation = useMemo(() => {
      const angle = Math.atan2(
        targetPosition.y - initialPosition.y,
        targetPosition.x - initialPosition.x
      );
      return angle - Math.PI / 2;
    }, []);

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
          <animated.mesh
            rotation={[0, 0, rotation]}
            position-x={x}
            position-y={y}
            position-z={z}
          >
            <boxGeometry args={[6, 6, 6]} />
            <meshBasicMaterial map={texture} />

            <Html
              style={{
                transform: 'translate(-50%, 0%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 22,
                fontFamily: 'monospace',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  background: 'black',
                  opacity: '30%',
                  width: '100%',
                  height: '100%',
                  zIndex: -1,
                }}
              />
              {attackIndex === 0 ? (
                <span style={{ color: 'white' }}>{word}</span>
              ) : (
                word.split('').map((letter, index) => (
                  <span
                    key={`${letter}-${index}`}
                    style={{
                      color: index < attackIndex ? 'grey' : 'orangered',
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
