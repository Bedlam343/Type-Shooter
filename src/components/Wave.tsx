import { useRef, useState } from 'react';
import useKeyboard from 'src/hooks/useKeyboard';
import EnemyUI from 'src/components/Enemy';
import { Enemy, EnemyDictionary } from 'src/types';

type WaveProps = {
  waveEnemies: EnemyDictionary;
  waveNumber: number;
  onStart?: () => void;
  onEnd?: () => void;
};

const Wave = ({ waveNumber, waveEnemies, onStart, onEnd }: WaveProps) => {
  const [enemies, setEnemies] = useState<EnemyDictionary>({ ...waveEnemies });
  const currentEnemy = useRef<Enemy | null>(null);

  useKeyboard((pressedKey: string, keySet: Set<string>) => {
    const key = pressedKey.toLowerCase();
    if (key < 'a' || key > 'z') return;
    if (keySet.has(key)) return;

    let enemy: Enemy;
    if (currentEnemy.current) {
      enemy = currentEnemy.current;
    } else {
      const newEnemy = Object.keys(enemies).find((word) => word[0] === key);
      if (!newEnemy) return;
      enemy = enemies[newEnemy];
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
  });

  return (
    <>
      {Object.keys(enemies).map((key) => (
        <EnemyUI key={key} enemy={enemies[key]} />
      ))}
    </>
  );
};

export default Wave;
