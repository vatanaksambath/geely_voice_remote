'use client';

import { useEffect } from 'react';

export default function ThemeController() {
  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      // Dark mode between 6:00 PM (18) and 5:59 AM (6)
      const isNight = hour >= 18 || hour < 6;
      
      if (isNight) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Run once on mount to ensure it's correct
    updateTheme();
    
    // Check every minute to automatically switch if the app is left open
    const interval = setInterval(updateTheme, 60000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
