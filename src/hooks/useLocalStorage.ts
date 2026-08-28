'use client';

import { useState, useEffect } from 'react';

const EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isClient, setIsClient] = useState(false);

  // Initialize from local storage on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        const parsedItem = JSON.parse(item);
        
        // Check if the item has a timestamp and if it has expired
        if (parsedItem && typeof parsedItem === 'object' && 'timestamp' in parsedItem) {
          const { value, timestamp } = parsedItem;
          
          if (Date.now() - timestamp > EXPIRATION_MS) {
            // Expired, clear it and use initial value
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
          } else {
            // Valid, use stored value
            setStoredValue(value);
          }
        } else {
          // Legacy format (no timestamp), clear it and use initial value
          // OR if we want to migrate, we could just accept it. 
          // Let's clear legacy data to ensure everyone is on the timestamp format.
          window.localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Update state and local storage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        const itemToStore = {
          value: valueToStore,
          timestamp: Date.now(),
        };
        window.localStorage.setItem(key, JSON.stringify(itemToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Prevent hydration mismatch by returning initialValue on server, 
  // and the actual value only after mounting on the client.
  return [isClient ? storedValue : initialValue, setValue] as const;
}
