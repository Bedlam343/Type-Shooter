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

type TransitionType = 'new-wave' | 'game-over' | 'game-won' | null;

const Game = ({ onEnd }: GameProps) => {
  const [wave, setWave] = useState<number>(96);
  const [enemies, setEnemies] = useState<Dictionary<Enemy>>(
    generateEnemies(wave)
  );
  const [transition, setTransition] = useState<TransitionType>('new-wave');
  const [pause, setPause] = useState<boolean>(false);

  const handleWaveSuccess = () => {
    if (wave >= 100) {
      setTransition('game-won');
      return;
    }

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
    } else if (transition === 'game-won') {
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
            <div style={{ ...styles.div, background: 'red' }}>Game Over</div>
          </animated.div>
        </Html>
      );
    } else if (transition === 'game-won') {
      return (
        <Html style={{ transform: 'translate(-50%, -50%)' }}>
          <animated.div>
            {/* @ts-expect-error ... */}
            <div style={{ ...styles.div, background: 'forestgreen' }}>
              You Won!
            </div>
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
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    width: 500,
    padding: '10px',
  },
};

export default Game;
