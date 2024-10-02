import { useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import Menu from 'src/components/Menu';
import Stars from 'src/components/Stars';
import Game from 'src/components/Game';

const Scene = () => {
  const [play, setPlay] = useState<boolean>(false);

  const startGame = () => {
    setPlay(true);
  };

  const endGame = () => {
    setPlay(false);
  };

  return (
    <>
      <OrbitControls />

      <Stars move={true} />

      {play ? <Game onEnd={endGame} /> : <Menu onPlay={startGame} />}
    </>
  );
};

export default Scene;
