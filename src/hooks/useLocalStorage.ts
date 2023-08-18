import { useState, useEffect } from 'react';

type InitialValue<T> = T | (() => T);

const getLocalValue = <T>(key: string, initValue: InitialValue<T>): T => {
  if (typeof window === 'undefined') return typeof initValue === 'function' ? (initValue as () => T)() : initValue;

  const localValue = JSON.parse(localStorage.getItem(key)!);
  if (localValue) return localValue;

  if (typeof initValue === 'function') return (initValue as () => T)();

  return initValue;
};

const useLocalStorage = <T>(key: string, initValue: InitialValue<T>) => {
  const [value, setValue] = useState<T>(() => getLocalValue(key, initValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
