import { useEffect, useRef, useState } from 'react';
import { Bullet, Enemy, Position } from 'src/types';
import { WORDS } from 'src/utils/words';
import EnemyUI from 'src/components/Enemy';
import { Physics, RigidBody } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';

const Scene = () => {
  const wordLengths = Object.keys(WORDS);

  const keyMap = useRef<{ [key: string]: boolean }>({});
  const enemyInitials = useRef<Set<string>>(new Set());
  // const enemyPositions = useRef<{ [key: string]: Position }>({});
  const currentEnemy = useRef<Enemy | null>(null);

  // const [bullets, setBullets] = useState<Bullet[]>([]);

  // story enemy with a key equal to its word's initial
  const [enemies, setEnemies] = useState<{ [key: string]: Enemy }>({});

  console.log('Scene re-render');

  // generate enemy every 5 seconds
  useEffect(() => {
    const generateEnemy = () => {
      // find word to assign enemy
      let word: string | null = null;
      while (!word) {
        const index = Math.floor(Math.random() * (WORDS[10].length - 1));
        const foundWord = WORDS[10][index];
        if (!enemyInitials.current.has(foundWord[0])) {
          word = foundWord;
        }
      }

      if (!word) {
        console.error('Enemy could not be created. No available word.');
        return;
      }

      const initial = word[0];
      const enemy: Enemy = {
        id: `${new Date().toISOString()}_${Math.random()}`,
        initialPosition: { x: Math.random() * -8 + 4, y: 4, z: 0 },
        targetPosition: { x: 0, y: -4, z: 0 },
        word,
        attackIndex: 0,
      };
      setEnemies((prevEnemies) => ({ ...prevEnemies, [initial]: enemy }));
      enemyInitials.current.add(word[0]);
    };

    const interval = setInterval(generateEnemy, 5000);

    return () => clearInterval(interval);
  }, []);

  // shoot bullets when keys are pressed
  useEffect(() => {
    const shootBullet = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (event.keyCode < 65 || event.keyCode > 90) return;
      if (keyMap.current[key]) return;

      // get position of enemy
      // const targetPosition = enemyPositions.current[key];
      // if (!targetPosition) return;

      keyMap.current[key] = true;

      const enemy = currentEnemy.current || enemies[key];
      if (!enemy) return;

      const { attackIndex, word } = enemy;

      if (word[attackIndex] === key) {
        if (attackIndex + 1 === word.length) {
          // all letters typed...destroy enemy
          currentEnemy.current = null;
          setEnemies((prevEnemies) => {
            const newEnemies = { ...prevEnemies };
            delete newEnemies[word[0]];
            return newEnemies;
          });
          enemyInitials.current.delete(word[0]);
        } else {
          // update attack index pertaining to the word
          const updatedEnemy = { ...enemy, attackIndex: attackIndex + 1 };
          setEnemies((prevEnemies) => ({
            ...prevEnemies,
            [word[0]]: updatedEnemy,
          }));
          currentEnemy.current = updatedEnemy;
        }
      }

      /* const bullet: Bullet = {
        id: `${new Date().toISOString()}-${key}`,
        initialPosition: { x: 0, y: -4, z: 0 },
        targetPosition,
      }; */
      // setBullets((prevBullets) => [...prevBullets, bullet]);
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
  }, [enemies]);

  // remove bullet from the DOM
  /* const unmountBullet = (bulletId: string) => {
    setBullets((prevBullets) =>
      prevBullets.filter((bullet) => bullet.id !== bulletId)
    );
  }; */

  const collisionHandler = () => {
    console.log('sphere-collision');
  };

  return (
    <Physics debug>
      <OrbitControls />

      <RigidBody
        type="fixed"
        colliders="hull"
        ccd={true}
        collisionGroups={0x0001}
        onCollisionEnter={collisionHandler}
      >
        <mesh position-y={-4} position-z={0}>
          <sphereGeometry args={[0.2]} />
          <meshBasicMaterial color="orange" />
        </mesh>
      </RigidBody>

      {/* {bullets.map((bullet) => (
        <BulletSpring
          key={bullet.id}
          bullet={bullet}
          onImpact={unmountBullet}
        />
      ))} */}

      {Object.keys(enemies).map((key) => (
        <EnemyUI key={key} enemy={enemies[key]} />
      ))}
    </Physics>
  );
};

export default Scene;
