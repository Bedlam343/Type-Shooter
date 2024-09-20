import { useEffect, useRef, useState } from 'react';
import { Bullet } from 'src/types';
import BulletSpring from 'src/components/Bullet';

const Scene = () => {
  const keyMap = useRef<{ [key: string]: boolean }>({});
  const [bullets, setBullets] = useState<Bullet[]>([]);

  console.log('Scene re-render');

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

  const removeBullet = (bulletId: string) => {
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
        <BulletSpring key={bullet.id} bullet={bullet} onImpact={removeBullet} />
      ))}
    </>
  );
};

export default Scene;
