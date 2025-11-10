import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Always use light theme
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Apply light theme class to body
  useEffect(() => {
    document.body.className = 'light-theme';
  }, []);

  // Disable theme toggle functionality
  const toggleTheme = () => {
    // Do nothing - theme is fixed to light
  };

  const value = {
    isDarkTheme: false,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 