import { Position } from 'src/types';

export const randomPosition = (xBound: number, yBound: number): Position => {
  const position = {
    x: Math.random() * -(xBound * 2) + xBound,
    y: Math.random() * -(yBound * 2) + yBound,
    z: 0,
  };
  if (Math.random() < 0.5) {
    position.x = Math.random() <= 0.5 ? xBound : -xBound;
  } else {
    position.y = Math.random() >= 0.5 ? yBound : -yBound;
  }

  return position;
};
