import { useEffect, useState } from 'react';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import Ownship from 'src/components/Ownship';
import Wave from 'src/components/Wave';
import Transition from 'src/components/Transition';
import Menu from 'src/components/Menu';
import { Dictionary, Enemy } from 'src/types';
import { generateEnemies } from 'src/utils';

const Scene = () => {
  const [play, setPlay] = useState<boolean>(false);
  const [wave, setWave] = useState<number>(1);
  const [enemies, setEnemies] = useState<Dictionary<Enemy>>(
    generateEnemies(wave)
  );
  const [transition, setTransition] = useState<boolean>(false);

  console.log('Scene re-render');

  const startGame = () => {
    setPlay(true);
    setTransition(true);
  };

  const handleWaveEnd = () => {
    setTransition(true);
    setWave(wave + 1);
    setEnemies(generateEnemies(wave + 1));
  };

  useEffect(() => {
    if (transition) {
      setTimeout(() => setTransition(false), 1500);
    }
  }, [transition]);

  const renderGame = () => {
    if (play) {
      return (
        <>
          {transition ? (
            <Transition
              text={`Wave ${wave}`}
              background="white"
              color="black"
            />
          ) : (
            <>
              <Ownship />
              <Wave
                waveEnemies={enemies}
                waveNumber={wave}
                onEnd={handleWaveEnd}
              />
            </>
          )}
        </>
      );
    }

    return <Menu onPlay={startGame} />;
  };

  return (
    <Physics debug>
      <OrbitControls />

      {renderGame()}
    </Physics>
  );
};

export default Scene;
