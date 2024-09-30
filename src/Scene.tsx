import { useState } from 'react';
import { OrbitControls, Stars } from '@react-three/drei';
import Menu from 'src/components/Menu';
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

      <Stars radius={100} count={10_000} factor={6} saturation={0} speed={0} />

      {play ? <Game onEnd={endGame} /> : <Menu onPlay={startGame} />}
    </>
  );
};

export default Scene;
