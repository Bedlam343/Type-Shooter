import { useTransition, animated } from '@react-spring/web';
import { Html } from '@react-three/drei';
import { useState } from 'react';

type TransitionProps = {
  text: string;
  background?: string;
  color?: string;
};

const Transition = ({
  text,
  background = 'lightblue',
  color = 'black',
}: TransitionProps) => {
  const [exit, setExit] = useState(false);

  const transition = useTransition(!exit, {
    from: {
      clipPath: 'polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)',
    },
    enter: {
      clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)',
    },
    leave: {
      clipPath: 'polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)',
    },
    exitBeforeEnter: true,
    onRest: () => setTimeout(() => setExit(true), 500),
    config: {
      duration: 500,
    },
  });

  return (
    <Html style={{ transform: 'translate(-50%, -50%)' }}>
      {transition((animation, item) => (
        <>
          {item && (
            <animated.div style={animation}>
              <div
                style={{
                  background,
                  fontSize: 24,
                  textAlign: 'center',
                  color,
                  width: 500,
                  padding: '10px',
                }}
              >
                {text}
              </div>
            </animated.div>
          )}
        </>
      ))}
    </Html>
  );
};

export default Transition;
