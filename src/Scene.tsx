import { useState } from 'react';
import Menu from 'src/components/Menu';
import Stars from 'src/components/Stars';
import Game from 'src/components/Game';

const Scene = () => {
  const [play, setPlay] = useState<boolean>(false);
  const [moveStars, setMoveStars] = useState<boolean>(true);

  const startGame = () => {
    setPlay(true);
  };

  const endGame = () => {
    setPlay(false);
  };

  const toggleMoveStars = () => {
    setMoveStars((prevStars) => !prevStars);
  };

  return (
    <>
      <Stars move={moveStars} />

      {play ? (
        <Game
          onEnd={endGame}
          onPause={toggleMoveStars}
          onResume={toggleMoveStars}
        />
      ) : (
        <Menu onPlay={startGame} />
      )}
    </>
  );
};

export default Scene;
