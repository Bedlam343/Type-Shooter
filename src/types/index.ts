export type Bullet = {
  id: string;
  initialPosition: { x: number; y: number; z: number };
  // remove when bullet reaches targetPosition?
  targetPosition: { x: number; y: number; z: number };
};

export type Enemy = {
  id: string;
  initialPosition: { x: number; y: number; z: number };
  targetPosition: { x: number; y: number; z: number };
  word: string;
  attackIndex: number;
};

export type Position = {
  x: number;
  y: number;
  z: number;
};
