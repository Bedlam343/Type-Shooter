import { Enemy, Dictionary } from 'src/types';
import { nTries, CONFIG, OWNSHIP_POSITION, WORDS, LETTERS } from 'src/utils';
import { randomBoundaryPosition, randomNumber } from 'src/utils/helpers';

export const generateEnemies = (wave: number): Dictionary<Enemy> => {
  let numLettersRemaining: number = 26;

  const enemies: Dictionary<Enemy> = {};
  const availableLetters: Dictionary<boolean> = {};
  LETTERS.forEach((letter) => {
    availableLetters[letter] = true;
  });

  if (wave <= CONFIG.length) {
    const config = CONFIG[wave - 1];

    const {
      numEnemies,
      minWordLength,
      maxWordLength,
      minDuration,
      maxDuration,
      spawnInterval,
      roundType,
    } = config;

    for (let i = 0; i < numEnemies; ++i) {
      let word: string = '';

      nTries(() => {
        let length: number | null = null;
        let letterIndex: number = -1;
        let letter: string | null = null;

        let minLength: number = minWordLength;
        let maxLength: number = maxWordLength;

        nTries(() => {
          length = randomNumber(minLength, maxLength);
          letterIndex = randomNumber(0, numLettersRemaining - 1);
          letter = Object.keys(availableLetters)[letterIndex];

          if (!WORDS[length]) {
            return false;
          } else if (!WORDS[length][letter]) {
            // decrease maxLength if we're not able to find letter
            // most likely it's because letter not in maxLength as fewer longer words
            if (numLettersRemaining > 1) {
              if (maxLength > minLength) {
                --maxLength;
              } else {
                --minLength;
              }
            }
            return false;
          }

          return true;
        }, 50);

        if (length === null || letter === null) {
          return false;
        }

        const words = WORDS[length][letter];
        const index = randomNumber(0, words.length - 1);

        if (!enemies[words[index]]) {
          // if word not already assigned to another enemy, take it
          word = words[index];

          delete availableLetters[letter];
          --numLettersRemaining;

          return true;
        }

        return false;
      }, 3);

      if (word) {
        const initialPosition = randomBoundaryPosition(140, 160);
        const enemy: Enemy = {
          id: word,
          initialPosition,
          targetPosition: { ...OWNSHIP_POSITION },
          word,
          attackIndex: 0,
          speed: randomNumber(minDuration, maxDuration),
          delay: spawnInterval * i,
        };
        enemies[word] = enemy;
      } else {
        console.error('Failed to find word to assign to enemy');
        continue;
      }
    }
  } else {
    console.error('Configuration not found for wave', wave);
    // generate configuration dynamically...
  }

  return enemies;
};
