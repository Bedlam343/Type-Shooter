import { animated, useSpring } from '@react-spring/three';
import { useEffect, useRef } from 'react';

const Scene = () => {
  const keyMap = useRef<{ [key: string]: boolean }>({});

  console.log('Scene re-render');

  const [spring, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  const handleClick = () => {
    api.start({
      to: { x: spring.x.get() === 1 ? 0 : 1 },
    });
  };

  // capture key presses
  useEffect(() => {
    const onDocumentKey = (e: KeyboardEvent) => {
      keyMap.current[e.code] = e.type === 'keydown';
      console.log(keyMap.current);
    };

    document.addEventListener('keydown', onDocumentKey);
    document.addEventListener('keyup', onDocumentKey);

    return () => {
      document.removeEventListener('keydown', onDocumentKey);
      document.removeEventListener('keyup', onDocumentKey);
    };
  }, []);

  return (
    <>
      <animated.mesh
        onClick={handleClick}
        position-x={spring.x}
        position-y={-4}
      >
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color="orange" />
      </animated.mesh>
    </>
  );
};

export default Scene;
