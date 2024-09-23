import { useEffect, useRef } from 'react';

const useKeyboard = (callback: (key: string, keySet: Set<string>) => void) => {
  const keySet = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      callback(event.key, keySet.current);
      keySet.current.add(event.key);
    };

    console.log('useKeyboard use-effect');

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      keySet.current.delete(key);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [callback]);

  return keySet;
};

export default useKeyboard;
