import { Html } from '@react-three/drei';

const Pause = () => {
  return (
    <Html
      style={{
        height: 200,
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: 'translate(-50%, -50%)',
      }}
      position={[0, 0, 0]}
    >
      <div style={{ display: 'flex', gap: 30 }}>
        <div style={{ height: 150, width: 40, background: 'white' }} />
        <div style={{ height: 150, width: 40, background: 'white' }} />
      </div>

      <p style={{ color: 'lightgrey' }}>Press spacebar to resume.</p>
    </Html>
  );
};

export default Pause;
