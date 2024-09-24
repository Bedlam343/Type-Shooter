import { useCallback, useRef, useState } from 'react';
import useKeyboard from 'src/hooks/useKeyboard';
import EnemyUI from 'src/components/Enemy';
import Laser from 'src/components/Laser';
import { Dictionary, Enemy, Position } from 'src/types';
import { OWNSHIP_POSITION } from 'src/utils/constants';

type WaveProps = {
  waveEnemies: Dictionary<Enemy>;
  waveNumber: number;
  onStart?: () => void;
  onEnd?: () => void;
};

const Wave = ({ waveNumber, waveEnemies, onStart, onEnd }: WaveProps) => {
  const [enemies, setEnemies] = useState<Dictionary<Enemy>>({ ...waveEnemies });

  const enemiesRef = useRef<Dictionary<Enemy>>({ ...waveEnemies });
  const currentEnemy = useRef<Enemy | null>(null);
  const enemyPositions = useRef<Dictionary<Position>>({});

  const attack = useCallback((pressedKey: string, keySet: Set<string>) => {
    const key = pressedKey.toLowerCase();
    const keyCode = key.charCodeAt(0);
    if (keySet.has(key)) return;

    if (key.length > 1 && key !== 'escape') return;
    if (keyCode < 'a'.charCodeAt(0) || keyCode > 'z'.charCodeAt(0)) return;

    let enemy: Enemy;
    if (currentEnemy.current) {
      if (key === 'escape') {
        // disengage lock from enemy
        const resetEnemy = { ...currentEnemy.current, attackIndex: 0 };
        setEnemies((prevEnemies) => ({
          ...prevEnemies,
          [resetEnemy.word]: { ...resetEnemy },
        }));
        currentEnemy.current = null;
        return;
      }

      enemy = currentEnemy.current;
    } else {
      const newEnemy = Object.keys(enemiesRef.current).find(
        (word) => word[0] === key && enemyPositions.current[word]
      );
      if (!newEnemy) return;
      enemy = enemiesRef.current[newEnemy];
    }

    const { attackIndex, word } = enemy;

    if (word[attackIndex] === key) {
      if (attackIndex + 1 === word.length) {
        // all letters typed...destroy enemy
        currentEnemy.current = null;
        setEnemies((prevEnemies) => {
          const newEnemies = { ...prevEnemies };
          delete newEnemies[word];
          return newEnemies;
        });
        delete enemiesRef.current[word];

        // end of wave
        // onEnd();
      } else {
        // update attack index pertaining to the word
        const updatedEnemy = { ...enemy, attackIndex: attackIndex + 1 };
        setEnemies((prevEnemies) => ({
          ...prevEnemies,
          [word]: updatedEnemy,
        }));
        currentEnemy.current = updatedEnemy;
      }
    }
  }, []);

  useKeyboard(attack);

  return (
    <>
      {Object.keys(enemies).map((key) => (
        <EnemyUI key={key} enemy={enemies[key]} ref={enemyPositions} />
      ))}

      <Laser
        source={OWNSHIP_POSITION}
        target={currentEnemy.current?.word}
        enemyPositions={enemyPositions}
      />
    </>
  );
};

export default Wave;
