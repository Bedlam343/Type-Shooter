import { useState } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import { EnemyDictionary } from 'src/types';
import Wave from './components/Wave';
import { generateEnemies } from './utils';

const Scene = () => {
  const [wave, setWave] = useState<number>(1);
  const [enemies, setEnemies] = useState<EnemyDictionary>(
    generateEnemies(wave)
  );

  console.log('Scene re-render');

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
        <mesh position-y={0} position-z={0}>
          <sphereGeometry args={[0.2]} />
          <meshBasicMaterial color="orange" />
        </mesh>
      </RigidBody>

      <Wave waveEnemies={enemies} waveNumber={wave} />
    </Physics>
  );
};

export default Scene;
