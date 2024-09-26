import { Enemy, Dictionary } from 'src/types';
import { nTries, CONFIG, OWNSHIP_POSITION, WORDS } from 'src/utils';
import { randomBoundaryPosition, randomNumber } from 'src/utils/helpers';

export const generateEnemies = (wave: number): Dictionary<Enemy> => {
  const enemies: Dictionary<Enemy> = {};
  const config = CONFIG[wave];

  if (config) {
    const {
      numEnemies,
      minWordLength,
      maxWordLength,
      minDuration,
      maxDuration,
      maxSpawnDelay,
    } = config;

    for (let i = 0; i < numEnemies; ++i) {
      let word: string = '';

      nTries(() => {
        let length: number = -1;
        while (!WORDS[length]) {
          // make sure index is valid
          length = randomNumber(minWordLength, maxWordLength);
        }

        const words = WORDS[length];
        const index = randomNumber(0, words.length - 1);

        if (!enemies[words[index]]) {
          // if word not alreadt assigned to another enemy, take it
          word = words[index];

          return true;
        }
        return false;
      }, 3);

      if (word) {
        const initialPosition = randomBoundaryPosition(7, 8);
        const enemy: Enemy = {
          id: word,
          initialPosition,
          targetPosition: { ...OWNSHIP_POSITION },
          word,
          attackIndex: 0,
          speed: randomNumber(minDuration, maxDuration),
          delay: randomNumber(0, maxSpawnDelay),
        };
        enemies[word] = enemy;
      } else {
        console.error('Failed to find word to assign to enemy');
        continue;
      }
    }
  } else {
    console.error('Configuration not found for wave', wave);
  }

  return enemies;
};
