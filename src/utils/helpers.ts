import * as THREE from 'three';
import { OWNSHIP_POSITION } from './constants';
import { Dictionary, Position } from 'src/types';

export const randomPosition = (xBound: number, yBound: number): Position => {
  const absX = Math.abs(xBound);
  const absY = Math.abs(yBound);
  const position = {
    x: randomNumber(-absX, absX),
    y: randomNumber(-absY, absY),
    z: 0,
  };

  if (Math.random() < 0.5) {
    position.x = Math.random() <= 0.5 ? xBound : -xBound;
  } else {
    position.y = Math.random() <= 0.5 ? yBound : -yBound;
  }

  return position;
};

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const distanceToOwnship = (position: Position) => {
  const { x: x1, y: y1 } = position;
  const { x, y } = OWNSHIP_POSITION;
  const targetPos = new THREE.Vector3(x1, y1, 0);
  const ownshipPos = new THREE.Vector3(x, y, 0);
  return ownshipPos.distanceTo(targetPos);
};

export const closestEnemyWithInitial = (
  initial: string,
  enemyPositions: Dictionary<Position>
): string | null => {
  const potentialEnemies: string[] = [];
  Object.keys(enemyPositions).forEach((word) => {
    if (word[0] === initial) {
      potentialEnemies.push(word);
    }
  });

  if (potentialEnemies.length === 0) return null;

  // select closest enemy
  let closestEnemy: string = potentialEnemies[0];
  let smallestDistance: number = distanceToOwnship(
    enemyPositions[closestEnemy]
  );
  for (let i = 1; i < potentialEnemies.length; ++i) {
    const currEnemy = potentialEnemies[i];
    const currDistance = distanceToOwnship(enemyPositions[currEnemy]);
    if (currDistance < smallestDistance) {
      closestEnemy = currEnemy;
      smallestDistance = currDistance;
    }
  }

  return closestEnemy;
};
