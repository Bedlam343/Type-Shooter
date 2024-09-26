/**
 * Runs a function n times, or until success
 * @param callback
 * @param tries
 */
export const nTries = (callback: () => boolean, tries: number) => {
  let i: number = 1;
  let success: boolean = false;

  while (i <= tries && !success) {
    success = callback();
    ++i;
  }
};
