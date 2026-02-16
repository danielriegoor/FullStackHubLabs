import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

interface NavigationContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  largeThumbnails: boolean;
  toggleLargeThumbnails: () => void;
  isTheaterMode: boolean; // <-- Novo estado
  toggleTheaterMode: () => void; // <-- Nova função
}

const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

export const NavigationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Preferences
  const [isDarkMode, setIsDarkMode] =
    useState(() => {
      if (
        typeof window !== 'undefined'
      ) {
        const savedTheme =
          localStorage.getItem('theme');
        if (savedTheme) {
          return savedTheme === 'dark';
        } else if (
          window.matchMedia &&
          window.matchMedia(
            '(prefers-color-scheme: dark)',
          ).matches
        ) {
          return true;
        }
      }
      return false; // Default for SSR or when window is not available
    });

  const [
    isTheaterMode,
    setIsTheaterMode,
  ] = useState(false);

  const [
    largeThumbnails,
    setLargeThumbnails,
  ] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedThumbnails =
        localStorage.getItem(
          'largeThumbnails',
        );
      return savedThumbnails === 'true';
    }
    return false;
  });
  // Update HTML class when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root =
        window.document.documentElement;
      if (isDarkMode) {
        root.classList.add('dark');
        localStorage.setItem(
          'theme',
          'dark',
        );
      } else {
        root.classList.remove('dark');
        localStorage.setItem(
          'theme',
          'light',
        );
      }
    }
  }, [isDarkMode]);

  // Save largeThumbnails preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'largeThumbnails',
        String(largeThumbnails),
      );
    }
  }, [largeThumbnails]);

  const toggleTheme = () =>
    setIsDarkMode((prev) => !prev);

  const toggleLargeThumbnails = () =>
    setLargeThumbnails((prev) => !prev);

  const toggleTheaterMode = () =>
    setIsTheaterMode((prev) => !prev);

  return (
    <NavigationContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        largeThumbnails,
        toggleLargeThumbnails,
        isTheaterMode,
        toggleTheaterMode,
      }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(
    NavigationContext,
  );
  if (context === undefined) {
    throw new Error(
      'useNavigation must be used within a NavigationProvider',
    );
  }
  return context;
};
