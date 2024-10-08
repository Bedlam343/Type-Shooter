import { useCallback, useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import EnemyUI from 'src/components/Enemy';
import Laser from 'src/components/Laser';
import useKeyboard from 'src/hooks/useKeyboard';
import { Dictionary, Enemy, Position } from 'src/types';
import { OWNSHIP_POSITION } from 'src/utils/constants';
import { closestEnemyWithInitial } from 'src/utils/helpers';

type WaveProps = {
  waveEnemies: Dictionary<Enemy>;
  laserVolume: number;
  pause: boolean;
  onFailure: () => void;
  onSuccess: () => void;
  onPause: () => void;
  onResume: () => void;
};

const Wave = ({
  waveEnemies,
  laserVolume,
  pause,
  onPause,
  onResume,
  onFailure,
  onSuccess,
}: WaveProps) => {
  const [enemies, setEnemies] = useState<Dictionary<Enemy>>({ ...waveEnemies });

  const [playLaserSound] = useSound('laser1.mp3', {
    volume: laserVolume,
  });
  const [playNoLaserSound] = useSound('no_laser.mp3', {
    volume: laserVolume > 0 ? laserVolume + 0.5 : 0,
  });

  const ownshipCollisionRef = useRef<boolean>(false);
  const enemiesRef = useRef<Dictionary<Enemy>>({ ...waveEnemies });
  const currentEnemyRef = useRef<Enemy | null>(null);
  const enemyPositionsRef = useRef<Dictionary<Position>>({});
  useEffect(() => {
    // initial all positions to null
    Object.keys(waveEnemies).forEach(
      (word) =>
        (enemyPositionsRef.current[word] = {
          x: Infinity,
          y: Infinity,
          z: Infinity,
        })
    );
  }, [waveEnemies]);

  useEffect(() => {
    if (Object.keys(enemies).length === 0) {
      onSuccess();
    }
  }, [enemies, onSuccess]);

  const handleOwnshipCollision = () => {
    if (!ownshipCollisionRef.current) {
      ownshipCollisionRef.current = true;
      onFailure();
    }
  };

  const attack = useCallback(
    (pressedKey: string, keySet: Set<string>) => {
      const key = pressedKey.toLowerCase();
      const keyCode = key.charCodeAt(0);
      if (keySet.has(key)) return;

      if (key === ' ') {
        if (pause) onResume();
        else onPause();
        return;
      }

      if (pause) return;

      if (key.length > 1 && key !== 'escape') return;
      if (keyCode < 'a'.charCodeAt(0) || keyCode > 'z'.charCodeAt(0)) return;

      let enemy: Enemy;
      if (currentEnemyRef.current) {
        // an enemy already under attack
        if (key === 'escape') {
          // disengage lock from enemy
          const resetEnemy = { ...currentEnemyRef.current, attackIndex: 0 };
          setEnemies((prevEnemies) => ({
            ...prevEnemies,
            [resetEnemy.word]: { ...resetEnemy },
          }));
          currentEnemyRef.current = null;
          return;
        }

        enemy = currentEnemyRef.current;
      } else {
        // select new closest enemy starting with the pressed key
        const closestEnemy = closestEnemyWithInitial(
          key,
          enemyPositionsRef.current
        );
        if (!closestEnemy) {
          playNoLaserSound();
          return;
        }
        enemy = enemiesRef.current[closestEnemy];
      }

      if (!enemy) {
        playNoLaserSound();
        console.error('Cant find enemy with letter', key, enemiesRef.current);
        return;
      }

      const { attackIndex, word } = enemy;

      if (word[attackIndex] === key) {
        if (attackIndex + 1 === word.length) {
          // all letters typed...destroy enemy
          currentEnemyRef.current = null;
          delete enemiesRef.current[word];
          delete enemyPositionsRef.current[word];

          setEnemies((prevEnemies) => {
            const newEnemies = { ...prevEnemies };
            delete newEnemies[word];
            return newEnemies;
          });
        } else {
          // update attack index pertaining to the word
          const updatedEnemy = { ...enemy, attackIndex: attackIndex + 1 };
          setEnemies((prevEnemies) => ({
            ...prevEnemies,
            [word]: updatedEnemy,
          }));
          currentEnemyRef.current = updatedEnemy;
        }

        playLaserSound();
      } else {
        playNoLaserSound();
      }
    },
    [pause, onResume, onPause, playLaserSound, playNoLaserSound]
  );

  useKeyboard(attack);

  return (
    <>
      {Object.keys(enemies).map((key) => (
        <EnemyUI
          key={key}
          enemy={enemies[key]}
          ref={enemyPositionsRef}
          onCollision={handleOwnshipCollision}
          pause={pause}
        />
      ))}

      <Laser
        source={OWNSHIP_POSITION}
        target={currentEnemyRef.current?.word}
        enemyPositions={enemyPositionsRef}
      />
    </>
  );
};

export default Wave;
