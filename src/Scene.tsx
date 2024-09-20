import { useEffect, useRef, useState } from 'react';
import { Bullet, Enemy } from 'src/types';
import BulletSpring from 'src/components/Bullet';
import { WORDS } from 'src/utils/words';
import EnemyUI from 'src/components/Enemy';

const Scene = () => {
  const keyMap = useRef<{ [key: string]: boolean }>({});

  const [bullets, setBullets] = useState<Bullet[]>([]);
  // story enemy with a key equal to its word's initial
  const [enemies, setEnemies] = useState<{ [key: string]: Enemy }>({});

  console.log('Scene re-render');

  // generate enemy every 5 seconds
  useEffect(() => {
    const generateEnemy = () => {
      // find word to assign enemy
      const word = WORDS.find((w) => !enemies[w[0]]);

      if (!word) {
        console.error('Enemy could not be created. No available word.');
        return;
      }

      console.log('adding enemy: ', word);

      const initial = word[0];
      const enemy: Enemy = {
        id: `${new Date().toISOString()}_${Math.random()}`,
        initialPosition: { x: Math.random() * -8 + 4, y: 4, z: 0 },
        targetPosition: { x: 0, y: -4, z: 0 },
        word,
      };
      setEnemies((prevEnemies) => ({ ...prevEnemies, [initial]: enemy }));
    };

    const interval = setInterval(generateEnemy, 5000);

    return () => clearInterval(interval);
  }, [enemies]);

  // shoot bullets when keys are pressed
  useEffect(() => {
    const shootBullet = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (event.keyCode < 65 || event.keyCode > 90) return;
      if (keyMap.current[key]) return;

      keyMap.current[key] = true;
      const bullet: Bullet = {
        id: `${new Date().toISOString()}-${key}`,
        initialPosition: { x: 0, y: -4, z: 0 },
        targetPosition: { x: Math.random() * -4 + 2, y: 4, z: 0 },
      };
      setBullets((prevBullets) => [...prevBullets, bullet]);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      keyMap.current[key] = false;
    };

    document.addEventListener('keydown', shootBullet);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', shootBullet);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // remove bullet from the DOM
  const unmountBullet = (bulletId: string) => {
    setBullets((prevBullets) =>
      prevBullets.filter((bullet) => bullet.id !== bulletId)
    );
  };

  return (
    <>
      <mesh position-y={-4} position-z={0}>
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color="orange" />
      </mesh>

      {bullets.map((bullet) => (
        <BulletSpring
          key={bullet.id}
          bullet={bullet}
          onImpact={unmountBullet}
        />
      ))}

      {Object.keys(enemies).map((key) => (
        <EnemyUI enemy={enemies[key]} />
      ))}
    </>
  );
};

export default Scene;
