import { Position } from 'src/types';

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

export const distance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
