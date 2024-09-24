import { useState } from 'react';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import Wave from 'src/components/Wave';
import { Dictionary, Enemy } from 'src/types';
import { generateEnemies } from 'src/utils';

const Scene = () => {
  const [wave, setWave] = useState<number>(1);
  const [enemies, setEnemies] = useState<Dictionary<Enemy>>(
    generateEnemies(wave)
  );
  const [transition, setTransition] = useState<boolean>(false);

  console.log('Scene re-render');

  const collisionHandler = () => {
    console.log('sphere-collision');
  };

  const handleWaveEnd = () => {
    setTransition(true);
  };

  return (
    <Physics debug>
      <OrbitControls />

      <mesh position-y={0} position-z={0}>
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color="orange" />
      </mesh>

      <Wave waveEnemies={enemies} waveNumber={wave} onEnd={handleWaveEnd} />
    </Physics>
  );
};

export default Scene;
