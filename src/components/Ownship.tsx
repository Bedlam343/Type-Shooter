import { OWNSHIP_POSITION, OWNSHIP_RADIUS } from 'src/utils';

const Ownship = () => {
  const { x, y, z } = OWNSHIP_POSITION;
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[OWNSHIP_RADIUS]} />
      <meshBasicMaterial color="green" />
    </mesh>
  );
};

export default Ownship;
