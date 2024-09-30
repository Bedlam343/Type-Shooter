import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import './index.css';
import Scene from 'src/Scene';

const root = createRoot(document.getElementById('root')!);

root.render(
  <Canvas
    gl={{ alpha: true }} // scene background color transparent
    orthographic
    camera={{
      zoom: 5,
      // position: [0, 0, 100],
      position: [0, 0, 6],
    }}
  >
    <Scene />
  </Canvas>
);
