import { useCallback, useEffect, useRef, useState } from 'react';
import useKeyboard from 'src/hooks/useKeyboard';
import EnemyUI from 'src/components/Enemy';
import Laser from 'src/components/Laser';
import { Dictionary, Enemy, Position } from 'src/types';
import { OWNSHIP_POSITION } from 'src/utils/constants';
import { closestEnemyWithInitial } from 'src/utils/helpers';

type WaveProps = {
  waveEnemies: Dictionary<Enemy>;
  waveNumber: number;
  onStart?: () => void;
  onEnd?: () => void;
};

const Wave = ({ waveNumber, waveEnemies, onStart, onEnd }: WaveProps) => {
  const [enemies, setEnemies] = useState<Dictionary<Enemy>>({ ...waveEnemies });

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

  const attack = useCallback((pressedKey: string, keySet: Set<string>) => {
    const key = pressedKey.toLowerCase();
    const keyCode = key.charCodeAt(0);
    if (keySet.has(key)) return;

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
      if (!closestEnemy) return;
      enemy = enemiesRef.current[closestEnemy];
    }

    if (!enemy) {
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

        // end of wave
        // onEnd();
      } else {
        // update attack index pertaining to the word
        const updatedEnemy = { ...enemy, attackIndex: attackIndex + 1 };
        setEnemies((prevEnemies) => ({
          ...prevEnemies,
          [word]: updatedEnemy,
        }));
        currentEnemyRef.current = updatedEnemy;
      }
    }
  }, []);

  useKeyboard(attack);

  return (
    <>
      {Object.keys(enemies).map((key) => (
        <EnemyUI key={key} enemy={enemies[key]} ref={enemyPositionsRef} />
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
