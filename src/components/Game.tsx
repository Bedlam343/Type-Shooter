import { useCallback, useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
import { animated } from '@react-spring/web';
import { Dictionary, Enemy } from 'src/types';
import { generateEnemies } from 'src/utils';
import Transition from 'src/components/Transition';
import Ownship from 'src/components/Ownship';
import Wave from 'src/components/Wave';

type GameProps = {
  onEnd: () => void;
};

type TransitionType = 'new-wave' | 'game-over' | null;

const Game = ({ onEnd }: GameProps) => {
  const [wave, setWave] = useState<number>(20);
  const [enemies, setEnemies] = useState<Dictionary<Enemy>>(
    generateEnemies(wave)
  );
  const [transition, setTransition] = useState<TransitionType>('new-wave');
  const [pause, setPause] = useState<boolean>(false);

  const handleWaveSuccess = () => {
    setTransition('new-wave');
    setWave(wave + 1);
    setEnemies(generateEnemies(wave + 1));
  };

  const handleWaveFailure = () => {
    setTransition('game-over');
  };

  const togglePause = useCallback(() => {
    setPause((prevPause) => !prevPause);
  }, []);

  useEffect(() => {
    if (transition === 'new-wave') {
      setTimeout(() => setTransition(null), 1500);
    } else if (transition === 'game-over') {
      setTimeout(() => onEnd(), 3000);
    }
  }, [transition, onEnd]);

  const renderGame = () => {
    if (transition === 'new-wave') {
      return (
        <Transition text={`Wave ${wave}`} background="white" color="black" />
      );
    } else if (transition === 'game-over') {
      return (
        <Html style={{ transform: 'translate(-50%, -50%)' }}>
          <animated.div>
            {/* @ts-expect-error ... */}
            <div style={styles.div}>Game Over</div>
          </animated.div>
        </Html>
      );
    }

    return (
      <>
        <Ownship />
        <Wave
          waveEnemies={enemies}
          onFailure={handleWaveFailure}
          onSuccess={handleWaveSuccess}
          onPause={togglePause}
          onResume={togglePause}
          pause={pause}
        />
      </>
    );
  };

  return <>{renderGame()}</>;
};

const styles = {
  div: {
    background: 'red',
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    width: 500,
    padding: '10px',
  },
};

export default Game;
