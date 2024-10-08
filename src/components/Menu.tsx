import { Html } from '@react-three/drei';
import { ChangeEvent, useState } from 'react';
import 'src/components/Menu.css';

type MenuProps = {
  onPlay: () => void;
  onVolumeChange: (volume: number) => void;
  volume: number;
};

const Menu = ({ onPlay, volume, onVolumeChange }: MenuProps) => {
  const [showControls, setShowControls] = useState<boolean>(false);
  const volumeImgSrc =
    volume === 0
      ? 'no_volume.png'
      : volume <= 0.5
      ? 'volume_down.png'
      : 'volume_up.png';

  const toggleControls = () => {
    setShowControls((currControls) => !currControls);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(event.target.value));
  };

  const render = () => {
    if (!showControls) {
      return (
        <div className="button-container">
          <button onClick={onPlay} className="play-button">
            Play
          </button>

          <button onClick={toggleControls} className="controls-button">
            Controls
          </button>

          <div className="volume-container">
            <img className="volume-image" src={volumeImgSrc} />
            <input
              className="volume-slider"
              type="range"
              max={1}
              min={0}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="controls-container">
        <p className="controls-title">How to Play</p>
        <p className="controls-description">
          It's very simple. <span className="controls-span">Type to shoot</span>
          . Once you shoot an enemy, you are locked onto it.{' '}
          <span className="controls-span">To disengage</span> from an enemy,
          either <span className="controls-span">press escape</span> or{' '}
          <span className="controls-span">kill the enemy</span>.
        </p>

        <p className="controls-description">
          <span className="controls-span">To pause</span> and take a much needed
          break in the middle of a wave,{' '}
          <span className="controls-span">press space</span>.
        </p>

        <button
          onClick={toggleControls}
          className="return-button"
          style={{ marginTop: 20 }}
        >
          Got it!
        </button>
      </div>
    );
  };

  return (
    <Html
      className="menu-container"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <h1 className="title">Type Shooter</h1>

      {render()}
    </Html>
  );
};

export default Menu;
