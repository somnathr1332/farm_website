import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle({ isScrolled }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
        isScrolled 
          ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
      aria-label="Toggle Dark Mode"
      title="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun size={20} className="hover:animate-spin-slow" />
      ) : (
        <Moon size={20} className="hover:animate-pulse" />
      )}
    </button>
  );
}
