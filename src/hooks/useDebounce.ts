import { useState, useEffect } from "react";

/**
 *
 * @param value state value which you want to debounce
 * @param delay delay in milliseconds
 * @returns debounced state value
 */
export default function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
