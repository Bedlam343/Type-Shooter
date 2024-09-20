export type Bullet = {
  id: string;
  initialPosition: { x: number; y: number; z: 0 };
  // remove when bullet reaches targetPosition?
  targetPosition: { x: number; y: number; z: 0 };
};
