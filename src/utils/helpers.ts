import * as THREE from 'three';
import { OWNSHIP_POSITION } from './constants';
import { Dictionary, Position } from 'src/types';

export const randomBoundaryPosition = (
  width: number,
  height: number,
  margin: number = 0.1
) => {
  const edges: string[] = ['top', 'bottom', 'left', 'right'];
  const edge: string = edges[Math.floor(Math.random() * edges.length)];

  let x: number, y: number;

  switch (edge) {
    case 'top':
      x = Math.random() * width;
      y = margin; // close to the top edge
      break;
    case 'bottom':
      x = Math.random() * width;
      y = height - margin; // close to the bottom edge
      break;
    case 'left':
      x = margin; // close to the left edge
      y = Math.random() * height;
      break;
    case 'right':
      x = width - margin; // close to the right edge
      y = Math.random() * height;
      break;
    default:
      throw new Error('Invalid Boundary Position');
  }

  return { x: x - 3.5, y: y - 4, z: 0 };
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
