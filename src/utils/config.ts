import { Config } from 'src/types';
import { ONE_SEC_IN_MS } from 'src/utils/constants';

export const CONFIG: Config = {
  1: {
    numEnemies: 5,
    minWordLength: 3,
    maxWordLength: 5,
    minDuration: 50 * ONE_SEC_IN_MS,
    maxDuration: 60 * ONE_SEC_IN_MS,
    maxSpawnDelay: 2 * ONE_SEC_IN_MS,
  },
  2: {
    numEnemies: 10,
    minWordLength: 3,
    maxWordLength: 5,
    minDuration: 50 * ONE_SEC_IN_MS,
    maxDuration: 60 * ONE_SEC_IN_MS,
    maxSpawnDelay: 5 * ONE_SEC_IN_MS,
  },
};
