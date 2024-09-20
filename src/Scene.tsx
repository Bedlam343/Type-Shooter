import { animated } from '@react-spring/three';
import { useState } from 'react';
import { Bullet } from 'src/types';
import BulletSpring from 'src/components/Bullet';

const Scene = () => {
  const [bullets, setBullets] = useState<Bullet[]>([]);

  console.log('Scene re-render');

  const shootBullet = () => {
    const bullet: Bullet = {
      id: new Date().toISOString(),
      initialPosition: { x: 0, y: -4, z: 0 },
      targetPosition: { x: Math.random() * -4 + 2, y: 4, z: 0 },
    };
    setBullets((prevBullets) => [...prevBullets, bullet]);
  };

  const removeBullet = (bulletId: string) => {
    setBullets((prevBullets) =>
      prevBullets.filter((bullet) => bullet.id !== bulletId)
    );
  };

  return (
    <>
      <animated.mesh
        position-y={-4}
        position-z={0}
        onPointerMissed={shootBullet}
      >
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color="orange" />
      </animated.mesh>

      {bullets.map((bullet) => (
        <BulletSpring key={bullet.id} bullet={bullet} onImpact={removeBullet} />
      ))}
    </>
  );
};

export default Scene;
