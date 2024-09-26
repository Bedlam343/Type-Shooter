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
  speed: number;
  delay: number;
};

export type Dictionary<T> = {
  [key: string]: T;
};

export type Position = {
  x: number;
  y: number;
  z: number;
};

export type Config = {
  [key: number]: {
    numEnemies: number;
    minWordLength: number;
    maxWordLength: number;
    minDuration: number;
    maxDuration: number;
    maxSpawnDelay: number;
  };
};
