import { useState } from 'react';
import Menu from 'src/components/Menu';
import Stars from 'src/components/Stars';
import Game from 'src/components/Game';

const Scene = () => {
  const [play, setPlay] = useState<boolean>(false);
  const [moveStars, setMoveStars] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.5);

  const startGame = () => {
    setPlay(true);
  };

  const endGame = () => {
    setPlay(false);
  };

  const toggleMoveStars = () => {
    setMoveStars((prevStars) => !prevStars);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  return (
    <>
      <Stars move={moveStars} />

      {play ? (
        <Game
          onEnd={endGame}
          onPause={toggleMoveStars}
          onResume={toggleMoveStars}
          volume={volume}
        />
      ) : (
        <Menu
          onPlay={startGame}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
      )}
    </>
  );
};

export default Scene;
