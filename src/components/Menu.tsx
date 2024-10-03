import { Html } from '@react-three/drei';
import { useState } from 'react';
import 'src/components/Menu.css';

type MenuProps = {
  onPlay: () => void;
};

const Menu = ({ onPlay }: MenuProps) => {
  const [showControls, setShowControls] = useState<boolean>(false);

  const toggleControls = () => {
    setShowControls((currControls) => !currControls);
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
