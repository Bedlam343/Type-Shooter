import { OWNSHIP_POSITION } from 'src/utils';

const Ownship = () => {
  const { x, y, z } = OWNSHIP_POSITION;
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.2]} />
      <meshBasicMaterial color="green" />
    </mesh>
  );
};

export default Ownship;
