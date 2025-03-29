// src/components/ThemeToggle.jsx
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}