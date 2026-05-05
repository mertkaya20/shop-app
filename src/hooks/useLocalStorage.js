import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error("localStorage'a yazılamadı");
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(null);
      localStorage.removeItem(key);
    } catch {
      console.error("localStorage'dan silinemedi");
    }
  };

  return { storedValue, setValue, removeValue };
};
