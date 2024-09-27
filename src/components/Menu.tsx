import { Html } from '@react-three/drei';
import 'src/components/Menu.css';

type MenuProps = {
  onPlay: () => void;
};

const Menu = ({ onPlay }: MenuProps) => {
  return (
    <Html
      className="menu-container"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <h1>Word Shooter</h1>

      <div>
        <button onClick={onPlay} className="play-button">
          Play
        </button>
      </div>
    </Html>
  );
};

export default Menu;
