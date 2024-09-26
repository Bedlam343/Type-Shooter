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
  let closestEnemy: string | null = null;
  let smallestDistance: number = Infinity;
  Object.keys(enemyPositions).forEach((word) => {
    if (word[0] === initial) {
      const currDistance = distanceToOwnship(enemyPositions[word]);
      if (currDistance < smallestDistance) {
        closestEnemy = word;
        smallestDistance = currDistance;
      }
    }
  });

  return closestEnemy;
};
