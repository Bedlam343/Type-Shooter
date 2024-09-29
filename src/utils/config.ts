import { Config } from 'src/types';
import { ONE_SEC_IN_MS } from 'src/utils/constants';

export const CONFIG: Config[] = [
  {
    numEnemies: 5,
    minWordLength: 3,
    maxWordLength: 5,
    minDuration: 50 * ONE_SEC_IN_MS,
    maxDuration: 60 * ONE_SEC_IN_MS,
    spawnInterval: ONE_SEC_IN_MS / 2,
    roundType: 'regular',
  },
  {
    numEnemies: 10,
    minWordLength: 3,
    maxWordLength: 5,
    minDuration: 50 * ONE_SEC_IN_MS,
    maxDuration: 60 * ONE_SEC_IN_MS,
    spawnInterval: ONE_SEC_IN_MS / 2,
    roundType: 'regular',
  },
  // rapid fire
  {
    numEnemies: 3,
    minWordLength: 4,
    maxWordLength: 4,
    minDuration: 5 * ONE_SEC_IN_MS,
    maxDuration: 5 * ONE_SEC_IN_MS,
    spawnInterval: ONE_SEC_IN_MS,
    roundType: 'rapid',
  },
  {
    numEnemies: 10,
    minWordLength: 4,
    maxWordLength: 6,
    minDuration: 45 * ONE_SEC_IN_MS,
    maxDuration: 55 * ONE_SEC_IN_MS,
    spawnInterval: ONE_SEC_IN_MS / 2,
    roundType: 'regular',
  },

  {
    numEnemies: 15,
    minWordLength: 4,
    maxWordLength: 7,
    minDuration: 40 * ONE_SEC_IN_MS,
    maxDuration: 50 * ONE_SEC_IN_MS,
    spawnInterval: ONE_SEC_IN_MS / 2,
    roundType: 'regular',
  },
  // rapid fire
  {
    numEnemies: 5,
    minWordLength: 4,
    maxWordLength: 4,
    minDuration: 5 * ONE_SEC_IN_MS,
    maxDuration: 5 * ONE_SEC_IN_MS,
    spawnInterval: ONE_SEC_IN_MS / 1.8,
    roundType: 'rapid',
  },
  {
    numEnemies: 15,
    minWordLength: 4,
    maxWordLength: 8,
    minDuration: 40 * ONE_SEC_IN_MS,
    maxDuration: 45 * ONE_SEC_IN_MS,
    spawnInterval: ONE_SEC_IN_MS / 2,
    roundType: 'regular',
  },
  // long words
  {
    numEnemies: 10,
    minWordLength: 10,
    maxWordLength: 10,
    minDuration: 35 * ONE_SEC_IN_MS,
    maxDuration: 35 * ONE_SEC_IN_MS,
    spawnInterval: ONE_SEC_IN_MS / 2,
    roundType: 'long',
  },
  {
    numEnemies: 20,
    minWordLength: 4,
    maxWordLength: 8,
    minDuration: 35 * ONE_SEC_IN_MS,
    maxDuration: 40 * ONE_SEC_IN_MS,
    spawnInterval: ONE_SEC_IN_MS / 2,
    roundType: 'regular',
  },
  // rapid fire
  {
    numEnemies: 10,
    minWordLength: 4,
    maxWordLength: 4,
    minDuration: 5 * ONE_SEC_IN_MS,
    maxDuration: 5 * ONE_SEC_IN_MS,
    spawnInterval: ONE_SEC_IN_MS / 1.6,
    roundType: 'rapid',
  },
  {
    numEnemies: 20,
    minWordLength: 4,
    maxWordLength: 9,
    minDuration: 30 * ONE_SEC_IN_MS,
    maxDuration: 40 * ONE_SEC_IN_MS,
    spawnInterval: ONE_SEC_IN_MS / 2,
    roundType: 'regular',
  },
];
