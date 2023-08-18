import useLocalStorage from './useLocalStorage';

const useToggle = (key: string, initValue: boolean) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const toggle = (value: boolean) => {
    setValue(typeof value === 'boolean' ? value : !value);
  };

  return [value, toggle] as const;
};

export default useToggle;